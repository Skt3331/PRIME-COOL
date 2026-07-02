
import fs from 'fs/promises';
import path from 'path';

async function walkDir(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules')) {
        results = results.concat(await walkDir(filePath));
      }
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.html')) {
        results.push(filePath);
      }
    }
  }
  return results;
}

async function updateImports() {
  const srcDir = path.join(process.cwd(), 'src');
  const indexHtml = path.join(process.cwd(), 'index.html');
  const files = await walkDir(srcDir);
  files.push(indexHtml);

  for (const file of files) {
    let content = await fs.readFile(file, 'utf8');
    
    // We only want to replace `.png` where it is an asset from `assets/` or `/assets/`
    let newContent = content.replace(/assets\/([a-zA-Z0-9_-]+)\.png/g, 'assets/$1.webp');
    
    if (content !== newContent) {
      await fs.writeFile(file, newContent, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}

updateImports();
