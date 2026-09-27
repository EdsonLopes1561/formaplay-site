import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const galeriaDir = path.resolve('public/galeria-sala-de-aula');

async function processImages() {
  console.log('=== OPTIMIZING PROJECT IMAGES ===');
  
  // 1. New Photos
  const newPhotos = [
    {
      src: path.join(galeriaDir, 'professor-mediando-desafio-logistico-em-aula.jpg'),
      destGaleria: path.join(galeriaDir, 'professor-mediando-desafio-logistico-em-aula.webp'),
      destPublic: path.join(publicDir, 'professor-mediando-desafio-logistico-em-aula.webp'),
      destPublicJpg: path.join(publicDir, 'professor-mediando-desafio-logistico-em-aula.jpg'),
      maxWidth: 1600,
      quality: 86
    },
    {
      src: path.join(galeriaDir, 'grupo-desafio-logistico-produto-completo.jpg'),
      destGaleria: path.join(galeriaDir, 'grupo-desafio-logistico-produto-completo.webp'),
      destPublic: path.join(publicDir, 'grupo-desafio-logistico-produto-completo.webp'),
      destPublicJpg: path.join(publicDir, 'grupo-desafio-logistico-produto-completo.jpg'),
      maxWidth: 1600,
      quality: 86
    },
    {
      src: path.join(galeriaDir, 'caminhoes-desafio-logistico-componentes.jpeg'),
      destGaleria: path.join(galeriaDir, 'caminhoes-desafio-logistico-componentes.webp'),
      destPublic: path.join(publicDir, 'caminhoes-desafio-logistico-componentes.webp'),
      destPublicJpg: path.join(publicDir, 'caminhoes-desafio-logistico-componentes.jpg'),
      maxWidth: 1280,
      quality: 86
    },
    {
      src: path.join(galeriaDir, 'caminhoes-chegada-desafio-logistico.jpeg'),
      destGaleria: path.join(galeriaDir, 'caminhoes-chegada-desafio-logistico.webp'),
      destPublic: path.join(publicDir, 'caminhoes-chegada-desafio-logistico.webp'),
      destPublicJpg: path.join(publicDir, 'caminhoes-chegada-desafio-logistico.jpg'),
      maxWidth: 1600,
      quality: 86
    }
  ];

  for (const photo of newPhotos) {
    if (fs.existsSync(photo.src)) {
      const origSize = fs.statSync(photo.src).size;
      
      // Auto-rotate with sharp to respect EXIF orientation (crucial for orientation=6)
      const pipeline = sharp(photo.src).rotate();
      const meta = await pipeline.metadata();
      
      let transform = sharp(photo.src).rotate();
      if (meta.width && meta.width > photo.maxWidth) {
        transform = transform.resize({ width: photo.maxWidth, withoutEnlargement: true });
      }

      const buffer = await transform.webp({ quality: photo.quality, effort: 6 }).toBuffer();
      fs.writeFileSync(photo.destGaleria, buffer);
      fs.writeFileSync(photo.destPublic, buffer);
      
      // Ensure jpg copy in root public exists as requested
      if (!fs.existsSync(photo.destPublicJpg)) {
        fs.copyFileSync(photo.src, photo.destPublicJpg);
      }

      console.log(`[PHOTO WEBP] ${path.basename(photo.destGaleria)}: ${(origSize/1024).toFixed(1)} KB -> ${(buffer.length/1024).toFixed(1)} KB (Saved ${(((origSize - buffer.length)/origSize)*100).toFixed(1)}%)`);
    } else {
      console.warn(`[MISSING] ${photo.src}`);
    }
  }

  // 2. Heavy PNGs to WebP
  const pngsToConvert = [
    { src: 'desafio-logistico-2.png', dest: 'desafio-logistico-2.webp', maxWidth: 1122, quality: 88 },
    { src: 'desafio-logistico-produto-mesa.png', dest: 'desafio-logistico-produto-mesa.webp', maxWidth: 1448, quality: 88 },
    { src: 'desafio-kids-2.png', dest: 'desafio-kids-2.webp', maxWidth: 1122, quality: 88 },
    { src: 'desafio-premium-2.png', dest: 'desafio-premium-2.webp', maxWidth: 1122, quality: 88 },
    { src: 'edicao-professor-2.png', dest: 'edicao-professor-2.webp', maxWidth: 1448, quality: 88 },
    { src: 'hero.png', dest: 'hero.webp', maxWidth: 1024, quality: 88 },
    { src: 'icone.png', dest: 'icone.webp', maxWidth: 800, quality: 90 },
    { src: 'bg_logistics.png', dest: 'bg_logistics.webp', maxWidth: 1024, quality: 85 },
    { src: 'desafio-logistico-cidade-futura.png', dest: 'desafio-logistico-cidade-futura.webp', maxWidth: 1254, quality: 88 },
  ];

  for (const item of pngsToConvert) {
    const srcPath = path.join(publicDir, item.src);
    const destPath = path.join(publicDir, item.dest);

    if (fs.existsSync(srcPath)) {
      const origSize = fs.statSync(srcPath).size;
      const buffer = await sharp(srcPath)
        .resize({ width: item.maxWidth, withoutEnlargement: true })
        .webp({ quality: item.quality, effort: 6 })
        .toBuffer();

      fs.writeFileSync(destPath, buffer);
      console.log(`[PNG->WEBP] ${item.dest}: ${(origSize/1024).toFixed(1)} KB -> ${(buffer.length/1024).toFixed(1)} KB (Saved ${(((origSize - buffer.length)/origSize)*100).toFixed(1)}%)`);
    }
  }

  console.log('=== OPTIMIZATION COMPLETE ===');
}

processImages().catch(console.error);
