const sharp = require('sharp');
const fs = require('fs');

async function optimize() {
  await sharp('src/assets/logo.webp')
    .resize(80, 80, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 60 })
    .toFile('src/assets/logo_opt.webp');
    
  await sharp('src/assets/service_fridge.webp')
    .webp({ quality: 50 })
    .toFile('src/assets/service_fridge_opt.webp');
    
  fs.renameSync('src/assets/logo_opt.webp', 'src/assets/logo.webp');
  fs.renameSync('src/assets/service_fridge_opt.webp', 'src/assets/service_fridge.webp');
  console.log("Images optimized.");
}

optimize().catch(console.error);
