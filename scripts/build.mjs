// Copies the deployable files into dist/ so tests, configs and workflows are never published.
import { mkdirSync, copyFileSync, rmSync } from 'node:fs';
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
copyFileSync('index.html', 'dist/index.html');
console.log('Built dist/index.html');
