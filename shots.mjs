// Local-only: screenshots each slide of the isolated keynote+supplier deck.
// Requires the deck dev server running. Usage: node keynote-deck/shots.mjs
import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '.shots')
mkdirSync(outDir, { recursive: true })
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const URL = process.env.DECK_URL || 'http://localhost:5174/'
const W = 1920, H = 1080
const COUNT = 28
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [`--window-size=${W},${H}`, '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 })
await page.goto(URL, { waitUntil: 'networkidle0' })
try { await page.evaluate(() => document.fonts && document.fonts.ready) } catch {}
await sleep(1200)

for (let i = 1; i <= COUNT; i++) {
  await sleep(1300) // let entrance animations settle
  if (await page.$('.leaflet-container')) {
    try {
      await page.waitForFunction(() => document.querySelectorAll('img.leaflet-tile-loaded').length >= 8, { timeout: 12000 })
    } catch {}
    await sleep(1600)
  }
  const f = join(outDir, `s${String(i).padStart(2, '0')}.png`)
  await page.screenshot({ path: f, type: 'png', clip: { x: 0, y: 0, width: W, height: H } })
  process.stdout.write(`captured ${i}/${COUNT}\n`)
  await page.keyboard.press('ArrowRight')
}
await browser.close()
console.log('done ->', outDir)
