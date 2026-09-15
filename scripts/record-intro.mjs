import puppeteer from 'puppeteer-core'
import { execFileSync } from 'child_process'
import { createRequire } from 'module'
import { mkdirSync, rmSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'video')
const FRAMES = join(OUT_DIR, 'intro-frames')
const MP4 = join(ROOT, 'public/assets/connected-retail/intro-connect.mp4')
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const URL = process.env.INTRO_URL || 'http://127.0.0.1:5180/intro-connect.html?record'
const W = 1920
const H = 1080
const FPS = 30
const DURATION = 28
const TOTAL = FPS * DURATION

mkdirSync(OUT_DIR, { recursive: true })
if (existsSync(FRAMES)) rmSync(FRAMES, { recursive: true })
mkdirSync(FRAMES, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

console.log(`Recording intro — ${TOTAL} frames @ ${FPS}fps (${DURATION}s)`)

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: W, height: H, deviceScaleFactor: 1 },
  args: [
    `--window-size=${W},${H}`,
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--disable-background-timer-throttling',
    '--disable-dev-shm-usage',
    '--autoplay-policy=no-user-gesture-required',
  ],
})

const page = await browser.newPage()
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 })
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60_000 })
await page.waitForFunction(() => typeof window.__introSeek === 'function', { timeout: 15_000 })
await page.waitForFunction(() => {
  const v = document.querySelector('video')
  return v && v.readyState >= 2
}, { timeout: 20_000 }).catch(() => {})
await page.evaluate(() => window.__introSeek(0))
await sleep(400)

for (let i = 0; i < TOTAL; i++) {
  const sec = i / FPS
  await page.evaluate((t) => new Promise((resolve) => {
    window.__introSeek(t)
    const v = document.querySelector('video')
    const finish = () => requestAnimationFrame(() => requestAnimationFrame(resolve))
    if (!v || t < 11.3 || t > 16.4) return finish()
    const onSeeked = () => {
      v.removeEventListener('seeked', onSeeked)
      finish()
    }
    v.addEventListener('seeked', onSeeked)
    try { v.currentTime = Math.max(0, t - 11.35) } catch { finish() }
    setTimeout(onSeeked, 160)
  }), sec)
  const file = join(FRAMES, `f${String(i).padStart(4, '0')}.jpg`)
  await page.screenshot({ path: file, type: 'jpeg', quality: 92 })
  if (i % 30 === 0) console.log(`  ${sec.toFixed(1)}s`)
}

await browser.close()

console.log('Encoding mp4…')
execFileSync(ffmpegPath, [
  '-y',
  '-framerate', String(FPS),
  '-i', join(FRAMES, 'f%04d.jpg'),
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-crf', '18',
  '-preset', 'medium',
  '-movflags', '+faststart',
  MP4,
], { stdio: 'inherit' })

rmSync(FRAMES, { recursive: true })
console.log(`Wrote ${MP4}`)
