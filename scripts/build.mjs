import { createRequire } from 'node:module'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
const root = fileURLToPath(new URL('..', import.meta.url))
const require = createRequire(import.meta.url)
// The ModuleLoader id must equal the package/plugin name; read it so a rename
// cannot leave the prebuilt client registered under a stale id.
const manifest = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))
const esbuild = process.env.ESBUILD_MODULE ? require(resolve(process.env.ESBUILD_MODULE)) : require('esbuild')
const result = await esbuild.build({ absWorkingDir: root, entryPoints: ['lib/client/index.mjs'], bundle: true, format: 'cjs', platform: 'browser', target: 'es2020', external: ['react'], write: false })
const output = `window.__ModuleLoader__.load({\n  id: ${JSON.stringify(manifest.name)},\n  factory: (require) => {\n    var module = { exports: {} };\n    var exports = module.exports;\n${result.outputFiles[0].text}\n    return module.exports;\n  }\n});\n`
const destination = resolve(root, 'lib/client.js')
if (process.argv.includes('--check')) {
  if (await readFile(destination, 'utf8') !== output) throw new Error('Stale lib/client.js; run npm run build')
  console.log('Client bundle matches source')
} else { await writeFile(destination, output); console.log('Built lib/client.js') }
