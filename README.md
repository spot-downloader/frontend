# Frontend Spotify Downloader

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen)](https://nodejs.org/)
[![Vue.js](https://img.shields.io/badge/vue.js-3.5-green)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/vite-7.0-purple)](https://vitejs.dev/)

Frontend web application untuk Spotify Downloader menggunakan Vue 3 + Vite + Tailwind CSS.

## 🎵 Cara Kerja

1. **Input URL** Spotify (track/album/playlist)
2. **Ambil Metadata** dari Spotify API via backend
3. **Download Audio** dari YouTube berdasarkan metadata
4. **Real-time Progress** tracking untuk setiap download

**Catatan:** Audio tidak didownload dari Spotify, melainkan dari YouTube berdasarkan informasi track yang didapat dari Spotify.

## ✨ Features

- ✅ Clean & modern UI dengan Tailwind CSS
- ✅ Support untuk track, album, dan playlist
- ✅ Real-time download progress
- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode ready
- ✅ Error handling & user feedback
- ✅ Docker deployment ready

## Prerequisites

- Node.js 20.19+ atau 22.12+ (untuk instalasi tanpa Docker)
- Docker & Docker Compose (untuk instalasi dengan Docker)
- Backend API sudah running (lihat backend-spotifydownloader)

## Instalasi

### Opsi 1: Tanpa Docker (Manual)

#### 1. Install Dependencies

```sh
npm install
```

#### 2. Konfigurasi Environment Variables

Copy file `.env.example` ke `.env`:
```sh
cp .env.example .env
```

Edit file `.env` dan sesuaikan dengan URL backend Anda:
```env
# Development (jika backend di localhost)
VITE_API_URL=http://localhost:3081

# Production
# VITE_API_URL=https://api.yourdomain.com

NODE_ENV=development
```

#### 3. Jalankan Development Server

```sh
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

#### 4. Build untuk Production

```sh
npm run build
```

File hasil build ada di folder `dist/`

#### 5. Preview Production Build (Opsional)

```sh
npm run preview
```

---

### Opsi 2: Dengan Docker

#### 1. Konfigurasi Environment Variables

Copy file `.env.example` ke `.env`:
```sh
cp .env.example .env
```

Edit file `.env` dan sesuaikan dengan URL backend Anda:
```env
# URL Backend API
VITE_API_URL=http://localhost:3081

# Atau jika deploy production
# VITE_API_URL=https://api.yourdomain.com

NODE_ENV=production
```

#### 2. Build dan Jalankan dengan Docker Compose

```sh
docker-compose up -d
```

Atau untuk rebuild image:
```sh
docker-compose up -d --build
```

Frontend akan berjalan di `http://localhost:3080`

#### 3. Cek Status Container

```sh
docker-compose ps
```

#### 4. Lihat Logs

```sh
docker-compose logs -f frontend
```

#### 5. Stop Service

```sh
docker-compose down
```

---

## Struktur Project

```
frontend-spotifydownloader/
├── src/
│   ├── App.vue              # Root component
│   ├── main.js              # Entry point
│   ├── assets/              # CSS & static assets
│   │   ├── base.css
│   │   └── tailwindcss.css
│   ├── plugin/              # Plugin configuration
│   │   └── axios.js         # Axios setup
│   ├── router/              # Vue Router
│   │   └── index.js
│   └── views/               # Page components
│       └── HomeView.vue     # Main download page
├── public/                  # Public static files
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
└── package.json
```

---

## Fitur

- ✅ Download single track dari Spotify
- ✅ Download album lengkap
- ✅ Download playlist
- ✅ Real-time progress tracking
- ✅ Responsive design dengan Tailwind CSS
- ✅ Modern UI/UX

---

## Development

### Hot Reload Development
```sh
npm run dev
```

Vite akan auto-reload setiap kali ada perubahan file.

### Build Production
```sh
npm run build
```

### Preview Production Build
```sh
npm run preview
```

---

## Konfigurasi Backend URL

Frontend menggunakan environment variable `VITE_API_URL` untuk terhubung ke backend.

**Penting:** Pastikan URL backend sesuai dengan environment:

- **Development:** `http://localhost:3081`
- **Production:** `https://api.yourdomain.com`

Jangan lupa enable CORS di backend untuk domain frontend Anda.

---

## Deployment

### Deploy Static Files

Setelah `npm run build`, deploy folder `dist/` ke:
- Netlify
- Vercel
- GitHub Pages
- Nginx/Apache server
- AWS S3 + CloudFront
- dll.

### Deploy dengan Docker

Frontend sudah include Nginx config untuk production. Cukup:

1. Set `VITE_API_URL` di `.env`
2. Run `docker-compose up -d`
3. Frontend siap di port 3080

---

## Troubleshooting

### CORS Error
Pastikan backend sudah enable CORS untuk origin frontend:
```env
# Di backend .env
CORS_ORIGINS=http://localhost:5173,http://localhost:3080
```

### API Connection Failed
Cek `VITE_API_URL` di `.env` sudah benar dan backend sudah running

### Port Already in Use
- Development: Vite default port 5173, bisa diganti di `vite.config.js`
- Docker: Port 3080, bisa diganti di `docker-compose.yml`

---

## Tech Stack

- **Vue 3** - Progressive JavaScript Framework
- **Vite** - Next Generation Frontend Tooling
- **Vue Router** - Official router for Vue.js
- **Axios** - Promise based HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Nginx** - Web server (untuk Docker deployment)

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur jika terinstall)

---

## License

GPL-3.0-or-later
