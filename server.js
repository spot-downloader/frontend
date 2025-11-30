import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3080;
const APP_URL = process.env.VITE_APP_URL || 'http://localhost:3080';

// Default meta tags
const defaultMeta = {
  title: 'Spotify Downloader - Download Lagu dari Spotify Gratis',
  description: 'Download lagu, playlist, album, dan artist dari Spotify ke MP3 dengan mudah dan gratis. Tanpa perlu login, langsung download!',
  keywords: 'spotify downloader, download lagu spotify, spotify to mp3, download playlist spotify, download album spotify',
  author: 'Spotify Downloader',
  image: '/og-image.png',
  favicon: '/favicon.ico',
};

// Generate meta tags HTML
function generateMetaTags(meta) {
  const absoluteImage = meta.image?.startsWith('http') ? meta.image : `${APP_URL}${meta.image}`;
  
  return `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta name="keywords" content="${meta.keywords}" />
    <meta name="author" content="${meta.author}" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="${meta.favicon}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${APP_URL}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${absoluteImage}" />
    <meta property="og:site_name" content="${meta.author}" />
    <meta property="og:locale" content="id_ID" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${APP_URL}" />
    <meta property="twitter:title" content="${meta.title}" />
    <meta property="twitter:description" content="${meta.description}" />
    <meta property="twitter:image" content="${absoluteImage}" />
    
    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${APP_URL}" />
  `.trim();
}

// Inject meta tags ke HTML
function injectMetaTags(html, metaTags) {
  html = html.replace(/<title>.*?<\/title>/gs, '');
  html = html.replace(/<meta name="description"[^>]*>/gs, '');
  
  return html.replace(
    /(<meta name="viewport"[^>]*>)/,
    `$1\n    \n    <!-- SEO Meta Tags -->\n    ${metaTags}`
  );
}

// Serve static files (exclude index.html)
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true,
  index: false,
}));

// Serve robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: ${APP_URL}/sitemap.xml
`);
});

// Serve sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const currentDate = new Date().toISOString();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${APP_URL}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  
  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});

// Main route handler - serve index.html with meta injection
app.get('*', (req, res) => {
  const htmlPath = path.join(__dirname, 'dist', 'index.html');
  
  try {
    let html = fs.readFileSync(htmlPath, 'utf-8');
    
    const metaTags = generateMetaTags(defaultMeta);
    html = injectMetaTags(html, metaTags);
    
    res.send(html);
  } catch (error) {
    console.error('❌ Error serving HTML:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend server running on http://localhost:${PORT}`);
  console.log(`📦 Serving static files from: ${path.join(__dirname, 'dist')}`);
});
