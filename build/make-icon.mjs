// Рисует build/icon.png (1024×1024) — electron-builder сам сделает из него .icns и .ico.
// Запуск: node build/make-icon.mjs
import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const SIZE = 1024
const SS = 4 // сглаживание суперсэмплингом

function insideRoundedRect(x, y, rx, ry, w, h, r) {
  const dx = Math.max(rx - x, 0, x - (rx + w))
  const dy = Math.max(ry - y, 0, y - (ry + h))
  if (dx === 0 && dy === 0) return true
  const cx = Math.min(Math.max(x, rx + r), rx + w - r)
  const cy = Math.min(Math.max(y, ry + r), ry + h - r)
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r
}

function insideTriangle(x, y, [ax, ay], [bx, by], [cx, cy]) {
  const sign = (px, py, qx, qy, rx, ry) => (px - rx) * (qy - ry) - (qx - rx) * (py - ry)
  const d1 = sign(x, y, ax, ay, bx, by)
  const d2 = sign(x, y, bx, by, cx, cy)
  const d3 = sign(x, y, cx, cy, ax, ay)
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0
  return !(hasNeg && hasPos)
}

/** Доля площади пикселя, покрытая фигурой. */
function coverage(px, py, test) {
  let hits = 0
  for (let sy = 0; sy < SS; sy += 1) {
    for (let sx = 0; sx < SS; sx += 1) {
      if (test(px + (sx + 0.5) / SS, py + (sy + 0.5) / SS)) hits += 1
    }
  }
  return hits / (SS * SS)
}

const background = (x, y) => insideRoundedRect(x, y, 0, 0, SIZE, SIZE, 230)
const arrowShaft = (x, y) => insideRoundedRect(x, y, 452, 208, 120, 340, 40)
const arrowHead = (x, y) => insideTriangle(x, y, [340, 500], [684, 500], [512, 700])
const shelf = (x, y) => insideRoundedRect(x, y, 288, 772, 448, 74, 37)

const pixels = Buffer.alloc(SIZE * SIZE * 4)

for (let y = 0; y < SIZE; y += 1) {
  for (let x = 0; x < SIZE; x += 1) {
    const bg = coverage(x, y, background)
    // Диагональный градиент индиго → фиолетовый, как у акцента в интерфейсе.
    const t = (x / SIZE) * 0.45 + (y / SIZE) * 0.55
    let r = Math.round(99 + (168 - 99) * t)
    let g = Math.round(102 + (85 - 102) * t)
    let b = Math.round(241 + (247 - 241) * t)

    const mark = Math.max(
      coverage(x, y, arrowShaft),
      coverage(x, y, arrowHead),
      coverage(x, y, shelf)
    )
    r = Math.round(r * (1 - mark) + 255 * mark)
    g = Math.round(g * (1 - mark) + 255 * mark)
    b = Math.round(b * (1 - mark) + 255 * mark)

    const offset = (y * SIZE + x) * 4
    pixels[offset] = r
    pixels[offset + 1] = g
    pixels[offset + 2] = b
    pixels[offset + 3] = Math.round(bg * 255)
  }
}

// --- Минимальный PNG-энкодер ---
const raw = Buffer.alloc(SIZE * (SIZE * 4 + 1))
for (let y = 0; y < SIZE; y += 1) {
  raw[y * (SIZE * 4 + 1)] = 0 // фильтр None
  pixels.copy(raw, y * (SIZE * 4 + 1) + 1, y * SIZE * 4, (y + 1) * SIZE * 4)
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

function crc32(buffer) {
  let c = 0xffffffff
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(SIZE, 0)
ihdr.writeUInt32BE(SIZE, 4)
ihdr[8] = 8 // бит на канал
ihdr[9] = 6 // RGBA

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0))
])

const target = path.join(path.dirname(fileURLToPath(import.meta.url)), 'icon.png')
writeFileSync(target, png)
console.log(`Иконка сохранена: ${target} (${(png.length / 1024).toFixed(1)} КБ)`)
