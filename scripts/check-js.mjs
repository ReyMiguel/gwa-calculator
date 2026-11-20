// Syntax-checks every inline <script> in index.html (no dependencies).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const html = readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
if (!scripts.length) { console.error('No inline scripts found'); process.exit(1); }
let failed = false;
scripts.forEach((code, i) => {
  try { new vm.Script(code, { filename: `index.html <script #${i + 1}>` }); }
  catch (e) { failed = true; console.error(`Syntax error in script #${i + 1}: ${e.message}`); }
});
if (failed) process.exit(1);
console.log(`OK: ${scripts.length} inline script(s) parsed`);
