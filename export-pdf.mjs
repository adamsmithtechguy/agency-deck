// Export the Red Star deck as a multi-page PDF (one page per slide).
// Usage: node export-pdf.mjs
// Env:   DECK_URL  (default: https://redstar-retail-media.pages.dev)
//        OUT       (default: redstar-retail-media.pdf)
import puppeteer from 'puppeteer-core'
import { PDFDocument } from 'pdf-lib'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = (process.env.DECK_URL || 'https://redstar-retail-media.pages.dev').replace(/\/$/, '')
const OUT = process.env.OUT || join(__dirname, 'redstar-retail-media.pdf')
const COUNT = Number(process.env.SLIDE_COUNT || 9)
const W = 1920
const H = 1080
const tmpDir = join(__dirname, '.pdf-export')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

mkdirSync(tmpDir, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [`--window-size=${W},${H}`, '--hide-scrollbars', '--force-device-scale-factor=1'],
})
const page = await browser.newPage()
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 })

const shots = []
for (let i = 1; i <= COUNT; i++) {
  const url = `${BASE}/?clean&slide=${i}`
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  try {
    await page.evaluate(() => document.fonts?.ready)
  } catch {}
  await sleep(1600)
  const f = join(tmpDir, `slide-${String(i).padStart(2, '0')}.png`)
  await page.screenshot({ path: f, type: 'png', clip: { x: 0, y: 0, width: W, height: H } })
  shots.push(f)
  process.stdout.write(`captured ${i}/${COUNT}\n`)
}

await browser.close()

const pdf = await PDFDocument.create()
for (const shot of shots) {
  const png = readFileSync(shot)
  const image = await pdf.embedPng(png)
  // 1920×1080 px at 96 dpi → 1440×810 pt (16:9 slide)
  const pageW = (W / 96) * 72
  const pageH = (H / 96) * 72
  const pdfPage = pdf.addPage([pageW, pageH])
  pdfPage.drawImage(image, { x: 0, y: 0, width: pageW, height: pageH })
}

writeFileSync(OUT, await pdf.save())
rmSync(tmpDir, { recursive: true, force: true })
console.log('PDF saved ->', OUT)
