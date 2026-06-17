import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { join, extname, relative, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const INPUT_DIR  = join(__dirname, 'public', 'imagenes')
const OUTPUT_DIR = join(__dirname, 'public', 'imagenes-opt')

const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...await getFiles(full))
    else if (EXTS.has(extname(e.name).toLowerCase())) files.push(full)
  }
  return files
}

async function compress(files) {
  let totalIn = 0, totalOut = 0, count = 0

  for (const file of files) {
    const rel     = relative(INPUT_DIR, file)
    const outPath = join(OUTPUT_DIR, rel).replace(/\.(jpg|jpeg|png|webp)$/i, '.webp')
    const outDir  = dirname(outPath)

    await mkdir(outDir, { recursive: true })

    const { size: inSize } = await stat(file)
    totalIn += inSize

    try {
      await sharp(file)
        .webp({ quality: 82, effort: 4 })
        .toFile(outPath)

      const { size: outSize } = await stat(outPath)
      totalOut += outSize
      count++

      const saved = Math.round((1 - outSize / inSize) * 100)
      console.log(`✓ ${rel.padEnd(55)} ${(inSize/1024).toFixed(0).padStart(7)} KB → ${(outSize/1024).toFixed(0).padStart(6)} KB  (-${saved}%)`)
    } catch (err) {
      console.error(`✗ ${rel}: ${err.message}`)
    }
  }

  console.log('\n─────────────────────────────────────────────────')
  console.log(`Imágenes procesadas : ${count}`)
  console.log(`Tamaño original     : ${(totalIn  / 1024 / 1024).toFixed(1)} MB`)
  console.log(`Tamaño optimizado   : ${(totalOut / 1024 / 1024).toFixed(1)} MB`)
  console.log(`Ahorro total        : ${((1 - totalOut/totalIn)*100).toFixed(1)}%`)
}

const files = await getFiles(INPUT_DIR)
console.log(`Procesando ${files.length} imágenes...\n`)
await compress(files)
