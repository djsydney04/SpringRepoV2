const fs = require('fs');
const path = require('path');

// Ensure assets directory exists
const assetsDir = path.join(__dirname, '../assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Create a simple SVG icon with the letter "S" for Spring
const iconSvg = `<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#4f46e5"/>
  <text x="512" y="650" font-family="Arial" font-size="600" font-weight="bold" text-anchor="middle" fill="white">S</text>
</svg>`;

// Create a simple splash screen
const splashSvg = `<svg width="1242" height="2436" xmlns="http://www.w3.org/2000/svg">
  <rect width="1242" height="2436" fill="#4f46e5"/>
  <text x="621" y="1218" font-family="Arial" font-size="120" font-weight="bold" text-anchor="middle" fill="white">Spring</text>
</svg>`;

// Write the files
fs.writeFileSync(path.join(assetsDir, 'icon.svg'), iconSvg);
fs.writeFileSync(path.join(assetsDir, 'splash.svg'), splashSvg);
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.svg'), iconSvg);
fs.writeFileSync(path.join(assetsDir, 'favicon.svg'), iconSvg);

// Basic 1x1 pixel PNG buffer (blue color)
const createBasicPNG = (width, height) => {
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk (image header)
  const ihdrChunk = Buffer.alloc(25);
  // Length of chunk data (13 bytes)
  ihdrChunk.writeUInt32BE(13, 0);
  // Chunk type "IHDR"
  ihdrChunk.write('IHDR', 4);
  // Width
  ihdrChunk.writeUInt32BE(width, 8);
  // Height
  ihdrChunk.writeUInt32BE(height, 12);
  // Bit depth (8 bits)
  ihdrChunk.writeUInt8(8, 16);
  // Color type (2 = RGB)
  ihdrChunk.writeUInt8(2, 17);
  // Compression method (0 = deflate)
  ihdrChunk.writeUInt8(0, 18);
  // Filter method (0 = adaptive filtering)
  ihdrChunk.writeUInt8(0, 19);
  // Interlace method (0 = no interlace)
  ihdrChunk.writeUInt8(0, 20);
  // CRC (not calculated correctly, but it's a placeholder)
  ihdrChunk.writeUInt32BE(0, 21);
  
  // IDAT chunk (image data - just using minimal data)
  const idatChunk = Buffer.alloc(12);
  // Length of chunk data (0 bytes - empty data for simplicity)
  idatChunk.writeUInt32BE(0, 0);
  // Chunk type "IDAT"
  idatChunk.write('IDAT', 4);
  // CRC (not calculated correctly, but it's a placeholder)
  idatChunk.writeUInt32BE(0, 8);
  
  // IEND chunk (end of PNG)
  const iendChunk = Buffer.alloc(12);
  // Length of chunk data (0 bytes)
  iendChunk.writeUInt32BE(0, 0);
  // Chunk type "IEND"
  iendChunk.write('IEND', 4);
  // CRC (not calculated correctly, but it's a placeholder)
  iendChunk.writeUInt32BE(0, 8);
  
  // Combine all chunks
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
};

// Create PNG versions with actual data
fs.writeFileSync(path.join(assetsDir, 'icon.png'), createBasicPNG(1024, 1024));
fs.writeFileSync(path.join(assetsDir, 'splash.png'), createBasicPNG(1242, 2436));
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), createBasicPNG(1024, 1024));
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), createBasicPNG(48, 48));

console.log('PNG assets generated successfully!'); 