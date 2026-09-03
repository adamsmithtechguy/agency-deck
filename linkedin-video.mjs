// LinkedIn promo: prewarm slides → one continuous take → constant-fps encode + music.
import puppeteer from 'puppeteer-core'
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync, existsSync } from 'fs'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FFMPEG = ffmpegPath.path
const OUT = join(__dirname, 'video')
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = process.env.DECK_URL || 'http://localhost:5174/'
const W = 1920
const H = 1080

// Per-slide hold (seconds). Must match main.tsx SLIDE_CROSSFADE_SEC for crossfades.
const CROSSFADE_SEC = 0.8
const DEFAULT_HOLD = 3.1

/** @type {{ n: number, hold: number }[]} */
const SLIDE_SEQUENCE = [
  { n: 1, hold: DEFAULT_HOLD },
  { n: 2, hold: DEFAULT_HOLD },
  { n: 3, hold: DEFAULT_HOLD },
  { n: 5, hold: DEFAULT_HOLD },
  { n: 6, hold: DEFAULT_HOLD },
  { n: 7, hold: DEFAULT_HOLD },
  { n: 8, hold: DEFAULT_HOLD },
  { n: 10, hold: DEFAULT_HOLD },
  { n: 11, hold: DEFAULT_HOLD },
  { n: 12, hold: DEFAULT_HOLD },
  { n: 13, hold: DEFAULT_HOLD },
  { n: 16, hold: DEFAULT_HOLD },
  { n: 19, hold: DEFAULT_HOLD },
  { n: 20, hold: 2.2 },   // quick — get to platform
  { n: 21, hold: 10.5 },  // platform carousel (~3 flips @ 3.2s)
  { n: 23, hold: 2.0 },    // quick
  { n: 24, hold: 2.0 },    // quick — make room for close
  { n: 28, hold: 9.0 },    // final deck slide (SClose) — hold on CTA
]

const SLIDES = SLIDE_SEQUENCE.map((s) => s.n)
const HOLD_SUM = SLIDE_SEQUENCE.reduce((t, s) => t + s.hold, 0)
// Each transition waits CROSSFADE_SEC inside __deckGoToSlide — must include all of them in the trim.
const TARGET_SEC = HOLD_SUM + SLIDE_SEQUENCE.length * CROSSFADE_SEC

const MUSIC_YOUTUBE = 'https://www.youtube.com/watch?v=vsbyIfQdieo'
const MUSIC_FILE = join(OUT, 'music-gregson-cello-suite-6.mp3')

mkdirSync(OUT, { recursive: true })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const CHROME_ARGS = [
  `--window-size=${W},${H}`,
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-renderer-backgrounding',
  '--disable-dev-shm-usage',
  '--enable-gpu',
  '--autoplay-policy=no-user-gesture-required',
]

const recorderOpts = {
  followNewTab: false,
  fps: 60,
  videoFrame: { width: W, height: H },
  videoCrf: 16,
  videoCodec: 'libx264',
  autopad: { color: '#050519' },
}

console.log(`Recording — ${SLIDES.length} slides, ~${TARGET_SEC.toFixed(0)}s (60fps capture → 30fps output)…`)
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: CHROME_ARGS,
})
const page = await browser.newPage()
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 })

const url = `${BASE}${BASE.includes('?') ? '&' : '?'}clean&video&slide=${SLIDES[0]}`
await page.goto(url, { waitUntil: 'networkidle0' })
try { await page.evaluate(() => document.fonts?.ready) } catch {}
await page.waitForFunction(() => typeof window.__deckGoToSlide === 'function')

console.log('Prewarming — mounting all slides and loading maps/videos…')
await page.evaluate((nums) => window.__deckPrewarmSlides?.(nums), SLIDES)
await sleep(4000)
for (const n of SLIDES) {
  await page.evaluate(async (slideNum) => { await window.__deckGoToSlide?.(slideNum) }, n)
  if (await page.$('.leaflet-container')) {
    try {
      await page.waitForFunction(() => document.querySelectorAll('img.leaflet-tile-loaded').length >= 6, { timeout: 10000 })
    } catch {}
  }
  await sleep(n === 21 ? 800 : 350)
}
await page.evaluate(async (n) => { await window.__deckGoToSlide?.(n) }, SLIDES[0])
await sleep(800)

const rawVideo = join(OUT, 'raw-take.mp4')
const silentVideo = join(OUT, 'silent.mp4')
const finalVideo = join(OUT, 'bright-blue-retail-media-linkedin.mp4')

const recorder = new PuppeteerScreenRecorder(page, recorderOpts)
await recorder.start(rawVideo)

for (let s = 1; s < SLIDE_SEQUENCE.length; s++) {
  await sleep(SLIDE_SEQUENCE[s - 1].hold * 1000)
  const { n, hold } = SLIDE_SEQUENCE[s]
  await page.evaluate(async (slideNum) => { await window.__deckGoToSlide?.(slideNum) }, n)
  console.log(`  → slide ${n} (after ${SLIDE_SEQUENCE[s - 1].hold}s hold, ${hold}s next)`)
}

const last = SLIDE_SEQUENCE[SLIDE_SEQUENCE.length - 1]
await sleep(last.hold * 1000)
await sleep(CROSSFADE_SEC * 1000)
await recorder.stop()
await browser.close()

console.log('Processing — constant 30fps, re-encode…')
execFileSync(FFMPEG, [
  '-y', '-i', rawVideo,
  '-an',
  '-vf', `fps=30,scale=${W}:${H}:flags=lanczos,setsar=1,format=yuv420p`,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
  '-vsync', 'cfr',
  '-t', String(TARGET_SEC),
  silentVideo,
], { stdio: 'inherit' })

if (!existsSync(MUSIC_FILE)) {
  console.log('Downloading Peter Gregson — Cello Suite No. 6 in D (6.6 Gigue)…')
  const rawAudio = join(OUT, 'music-gregson-cello-suite-6.mp4')
  execFileSync('python3', [
    '-m', 'yt_dlp',
    '--extractor-args', 'youtube:player_client=android',
    '-f', 'bestaudio/best',
    '-o', rawAudio,
    MUSIC_YOUTUBE,
  ], { stdio: 'inherit' })
  execFileSync(FFMPEG, ['-y', '-i', rawAudio, '-vn', '-acodec', 'libmp3lame', '-q:a', '2', MUSIC_FILE], { stdio: 'inherit' })
}

console.log('Adding music…')
execFileSync(FFMPEG, [
  '-y', '-i', silentVideo, '-i', MUSIC_FILE,
  '-filter_complex',
  `[1:a]atrim=0:${TARGET_SEC},volume=0.22,afade=t=in:st=0:d=2,afade=t=out:st=${TARGET_SEC - 3}:d=3[a]`,
  '-map', '0:v', '-map', '[a]',
  '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest',
  finalVideo,
], { stdio: 'inherit' })

execFileSync('cp', [finalVideo, join(process.env.HOME, 'Desktop', 'bright-blue-retail-media-linkedin.mp4')])

console.log(`\nDone → ${finalVideo} (${TARGET_SEC.toFixed(0)}s)`)
console.log('Also copied to Desktop/bright-blue-retail-media-linkedin.mp4')
console.log('Music: Bach — Cello Suite No. 6 in D (6.6 Gigue), Recomposed by Peter Gregson (Deutsche Grammophon)')
