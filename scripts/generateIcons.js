import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate SVG
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>
  
  <!-- Base Background -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>
  
  <!-- Inner circular badge -->
  <circle cx="256" cy="256" r="200" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.1" stroke-width="4"/>
  
  <!-- Graduation Cap & Certificate / Tools Motif -->
  <g filter="url(#shadow)" transform="translate(0, -10)">
    <!-- Cap Diamond -->
    <polygon points="256,120 410,195 256,270 102,195" fill="url(#goldGrad)" stroke="#d97706" stroke-width="4"/>
    
    <!-- Skull cap beneath -->
    <path d="M160,225 L160,285 C160,335 352,335 352,285 L352,225 Z" fill="#f8fafc" fill-opacity="0.95"/>
    
    <!-- Tassel string & dangling ball -->
    <path d="M256,195 Q380,210 395,290" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round"/>
    <circle cx="395" cy="295" r="14" fill="#fbbf24"/>
    
    <!-- Center gear / compass / sun accent -->
    <circle cx="256" cy="285" r="32" fill="#0284c7" stroke="#ffffff" stroke-width="4"/>
    <!-- Gear teeth or Argentine star lines -->
    <line x1="256" y1="245" x2="256" y2="252" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
    <line x1="256" y1="318" x2="256" y2="325" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
    <line x1="216" y1="285" x2="223" y2="285" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
    <line x1="289" y1="285" x2="296" y2="285" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
  </g>

  <!-- Bottom text or emblem -->
  <text x="256" y="415" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" letter-spacing="4" fill="#38bdf8">EDU NO FORMAL</text>
  <text x="256" y="450" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="20" letter-spacing="6" fill="#94a3b8">ARGENTINA</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);

// CRC table for PNG
const table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
  }
  table[i] = c;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  
  let crc = 0 ^ (-1);
  const combined = Buffer.concat([typeBuf, data]);
  for (let i = 0; i < combined.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ combined[i]) & 0xFF];
  }
  crc = (crc ^ (-1)) >>> 0;
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function generatePNG(width, height, isMaskable = false) {
  const buffer = Buffer.alloc(height * (width * 4 + 1));
  let pos = 0;
  const cx = width / 2;
  const cy = height / 2;
  const maxR = width / 2;

  for (let y = 0; y < height; y++) {
    buffer[pos++] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      const dx = (x - cx) / maxR;
      const dy = (y - cy) / maxR;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Dark elegant navy background: #0f172a
      let r = 15, g = 23, b = 42, a = 255;

      // Diagonal gradient to cyan: #0284c7
      const t = (x + y) / (width + height);
      r = Math.floor(15 + t * (2 - 15));
      g = Math.floor(23 + t * (132 - 23));
      b = Math.floor(42 + t * (199 - 42));

      // Central circular / diamond crest
      const safeRadius = isMaskable ? 0.65 : 0.82;
      if (dist < safeRadius) {
        // Inner contrast ring
        if (dist > safeRadius - 0.04) {
          r = 251; g = 191; b = 36; // Amber gold #fbbf24
        } else if (dist < safeRadius - 0.15 && dist > safeRadius - 0.35) {
          // Inner cap diamond representation
          r = 245; g = 158; b = 11; // Amber 500
        } else if (dist <= safeRadius - 0.35) {
          // Central emblem: cyan/sky
          r = 56; g = 189; b = 248; // Sky 400
        }
      }

      buffer[pos++] = r;
      buffer[pos++] = g;
      buffer[pos++] = b;
      buffer[pos++] = a;
    }
  }

  const compressed = zlib.deflateSync(buffer);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    pngHeader,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// Write PWA icons
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generatePNG(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generatePNG(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generatePNG(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePNG(180, 180, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), generatePNG(32, 32, false));

console.log('All PWA icons successfully generated in /public!');
