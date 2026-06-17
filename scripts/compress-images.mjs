import sharp from 'sharp'
import { readdirSync, statSync, mkdirSync } from 'fs'
import { join, extname, basename } from 'path'

const INPUT  = 'public/imagenes/proyectos/derechos-humanos'
const OUTPUT = 'public/imagenes/proyectos/derechos-humanos/compressed'

mkdirSync(OUTPUT, { recursive: true })

const EXTS = ['.jpg', '.jpeg', '.png', '.webp']

const files = readdirSync(INPUT).filter(f => {
  const ext = extname(f).toLowerCase()
  return EXTS.includes(ext) && statSync(join(INPUT, f)).isFile()
})

console.log(`\nComprimiendo ${files.length} imágenes...\n`)

let totalBefore = 0
let totalAfter  = 0

for (const file of files) {
  const inputPath  = join(INPUT, file)
  const name       = basename(file, extname(file))
  const outputPath = join(OUTPUT, `${name}.webp`)

  const sizeBefore = statSync(inputPath).size

  await sharp(inputPath)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(outputPath)

  const sizeAfter = statSync(outputPath).size

  totalBefore += sizeBefore
  totalAfter  += sizeAfter

  const pct = Math.round((1 - sizeAfter / sizeBefore) * 100)
  console.log(`✓ ${file.padEnd(45)} ${(sizeBefore/1024).toFixed(0).padStart(5)} KB → ${(sizeAfter/1024).toFixed(0).padStart(4)} KB  (-${pct}%)`)
}

console.log(`\n${'─'.repeat(70)}`)
console.log(`Total antes:  ${(totalBefore / 1024 / 1024).toFixed(1)} MB`)
console.log(`Total después: ${(totalAfter  / 1024 / 1024).toFixed(1)} MB`)
console.log(`Ahorro:        ${((1 - totalAfter/totalBefore)*100).toFixed(0)}% menos\n`)
