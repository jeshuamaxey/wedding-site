#!/usr/bin/env node
/**
 * Downloads CRT monitor models from Sketchfab and places them in public/models/.
 *
 * Prerequisites:
 *   1. Free Sketchfab account at sketchfab.com
 *   2. API token from sketchfab.com/settings/password-and-api
 *
 * Usage:
 *   SKETCHFAB_TOKEN=your_32_char_token node scripts/download-models.mjs
 *
 * Each model is extracted to public/models/{slug}/ so that R3F can load it
 * from the URL /models/{slug}/scene.gltf (or /models/{slug}/scene.glb).
 *
 * CC-BY licence requires attribution — add a credits line to your site footer.
 */

import { mkdir, writeFile, unlink, readdir, rename, rm } from 'fs/promises'
import { existsSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'public', 'models')

const TOKEN = process.env.SKETCHFAB_TOKEN
if (!TOKEN) {
  console.error('\nUsage: SKETCHFAB_TOKEN=your_token node scripts/download-models.mjs\n')
  console.error('Get your token from: sketchfab.com/settings/password-and-api\n')
  process.exit(1)
}

const MODELS = [
  {
    id: 'f2ff0013f86e4cd0a2aee183a23bdfee',
    slug: 'crt-fizyman',
    name: 'CRT Computer Monitor',
    creator: 'fizyman',
  },
  {
    id: 'e2dd2887a8904e4fa3d5a32e2935adb9',
    slug: 'crt-james',
    name: 'CRT Monitor',
    creator: 'James.Harness',
  },
  {
    id: 'd65167cdb74a458e9931ba3f88f4b5e7',
    slug: 'crt-charlel',
    name: 'RM C7BBR CRT Monitor',
    creator: 'charlel',
  },
  {
    id: '38cb8c4a7ad44611a0dd3da65d977580',
    slug: 'crt-sga',
    name: 'Compaq S720 Monitor',
    creator: 'SGAstudio',
  },
  {
    id: '73afcd4ed95c4eedbec8774512101bcb',
    slug: 'crt-setup',
    name: 'Old CRT Computer Setup',
    creator: 'Minute_watchers_64',
  },
  {
    id: '485c39940aa344ddb80c5a42d4e9241e',
    slug: 'crt-wireforks',
    name: 'Old School CRT Monitor',
    creator: 'wireforks',
  },
  {
    id: '8a658b94c60140e0bbdfc78f30ac8e2f',
    slug: 'crt-dio',
    name: 'Old CRT Monitor (PS1 Style)',
    creator: 'Dio Pieretti',
  },
]

await mkdir(OUT, { recursive: true })

// Find the primary .gltf or .glb file within an extracted directory
async function findModelFile(dir) {
  async function walk(d) {
    const entries = await readdir(d, { withFileTypes: true })
    for (const e of entries) {
      const full = path.join(d, e.name)
      if (e.isDirectory()) {
        const found = await walk(full)
        if (found) return found
      } else if (e.name.endsWith('.glb') || e.name.endsWith('.gltf')) {
        return full
      }
    }
    return null
  }
  return walk(dir)
}

let successCount = 0

for (const model of MODELS) {
  const modelDir = path.join(OUT, model.slug)

  // Skip if already downloaded
  if (existsSync(modelDir)) {
    console.log(`  ✓ ${model.slug} (already exists, skipping)`)
    successCount++
    continue
  }

  process.stdout.write(`  ↓ ${model.slug} (${model.name})... `)

  // 1. Request a temporary download URL from the Sketchfab API
  let gltfUrl
  try {
    const res = await fetch(`https://api.sketchfab.com/v3/models/${model.id}/download`, {
      headers: { Authorization: `Token ${TOKEN}` },
    })
    if (!res.ok) {
      const body = await res.text()
      console.error(`FAILED (HTTP ${res.status}): ${body}`)
      continue
    }
    const data = await res.json()
    gltfUrl = data.gltf?.url
    if (!gltfUrl) {
      console.error('FAILED: no gltf URL in API response. Model may not be downloadable.')
      continue
    }
  } catch (err) {
    console.error(`FAILED (network): ${err.message}`)
    continue
  }

  // 2. Download the zip archive
  const zipPath = path.join(OUT, `${model.slug}.zip`)
  try {
    const zipRes = await fetch(gltfUrl)
    if (!zipRes.ok) {
      console.error(`FAILED downloading zip (HTTP ${zipRes.status})`)
      continue
    }
    const buf = Buffer.from(await zipRes.arrayBuffer())
    await writeFile(zipPath, buf)
  } catch (err) {
    console.error(`FAILED (zip download): ${err.message}`)
    continue
  }

  // 3. Extract the zip
  const tmpDir = path.join(OUT, `${model.slug}_tmp`)
  try {
    await mkdir(tmpDir, { recursive: true })
    execSync(`unzip -q -o "${zipPath}" -d "${tmpDir}"`)
    await unlink(zipPath)
  } catch (err) {
    console.error(`FAILED (unzip): ${err.message}`)
    await unlink(zipPath).catch(() => {})
    await rm(tmpDir, { recursive: true, force: true })
    continue
  }

  // 4. Find the .gltf/.glb file and move the whole extracted tree to the slug dir
  const modelFile = await findModelFile(tmpDir)
  if (!modelFile) {
    console.error('FAILED: no .gltf or .glb file found in archive')
    await rm(tmpDir, { recursive: true, force: true })
    continue
  }

  // Move the directory containing the model file up to public/models/{slug}/
  const modelFileDir = path.dirname(modelFile)
  await rename(modelFileDir, modelDir)
  await rm(tmpDir, { recursive: true, force: true })

  console.log('done')
  successCount++
}

console.log(`\n${successCount}/${MODELS.length} models ready in public/models/`)
console.log('\nAttribution required (CC-BY):')
for (const m of MODELS) {
  console.log(`  "${m.name}" by ${m.creator} — sketchfab.com`)
}
