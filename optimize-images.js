import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function optimizeImages() {
  const assetsDir = path.join(process.cwd(), 'src/assets');
  const files = await fs.readdir(assetsDir);
  
  const pngFiles = files.filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  
  for (const file of pngFiles) {
    const filePath = path.join(assetsDir, file);
    const fileNameWithoutExt = path.parse(file).name;
    const webpPath = path.join(assetsDir, `${fileNameWithoutExt}.webp`);
    
    console.log(`Converting ${file} to WebP...`);
    
    // For logo, we can resize it to 200x200 max. For others, maybe 800x800.
    let resizeArg = '';
    if (file.includes('logo')) {
      resizeArg = 'resize 200 200 --fit inside';
    } else {
      resizeArg = 'resize 800 800 --fit inside';
    }
    
    try {
      await execAsync(`npx -y sharp-cli@latest -i "${filePath}" -o "${webpPath}" ${resizeArg}`);
      console.log(`Successfully created ${webpPath}`);
      await fs.unlink(filePath);
      console.log(`Deleted original file ${filePath}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
}

optimizeImages();
