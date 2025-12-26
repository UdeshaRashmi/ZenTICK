const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'frontend', 'src', 'sounds');
const destDir = path.resolve(__dirname, '..', 'frontend', 'public', 'sounds');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyMp3Files() {
  ensureDir(destDir);
  if (!fs.existsSync(srcDir)) {
    console.error('Source directory does not exist:', srcDir);
    process.exit(1);
  }
  const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.mp3'));
  if (files.length === 0) {
    console.log('No .mp3 files found in', srcDir);
    return;
  }
  files.forEach((file) => {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file);
    fs.copyFileSync(src, dest);
    console.log('Copied', file, '->', dest);
  });
}

copyMp3Files();
console.log('Done.');
