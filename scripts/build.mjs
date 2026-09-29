import { build } from 'esbuild'
import { readFile, writeFile } from 'node:fs/promises'
await build({
  entryPoints: ['src/client.jsx'], outfile: 'lib/client.js', bundle: true,
  platform: 'browser', format: 'cjs', target: 'es2022', jsx: 'automatic',
  external: ['react', 'react/jsx-runtime'], loader: { '.css': 'text' },
  banner: { js: 'window.__ModuleLoader__.load({id:"@lemoncat7/dsh-worklog",factory:(require)=>{var module={exports:{}};var exports=module.exports;' },
  footer: { js: 'return module.exports;}});' },
})
await build({ entryPoints: ['src/web-entry.jsx'], outfile: 'lib/workspace.js', bundle: true,
  platform: 'browser', format: 'esm', target: 'es2022', jsx: 'automatic', minify: true,
  loader: { '.css': 'text' }, define: { 'process.env.NODE_ENV': '"production"' },
})
await writeFile('lib/workspace.css', (await readFile('src/client.css', 'utf8')) + '\n' + (await readFile('src/web-embedded.css', 'utf8')))
