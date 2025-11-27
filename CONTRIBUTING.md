# Contributing to Frontend Spotify Downloader

Terima kasih atas minat Anda untuk berkontribusi pada proyek ini! 🎉

## Cara Berkontribusi

### Melaporkan Bug

Jika Anda menemukan bug, silakan buat issue baru dengan informasi berikut:

1. **Deskripsi jelas** tentang masalahnya
2. **Langkah-langkah untuk mereproduksi** bug
3. **Perilaku yang diharapkan** vs **perilaku aktual**
4. **Browser dan versi** (Chrome 120, Firefox 121, dll)
5. **Screenshots atau video** jika relevan

### Mengajukan Fitur Baru

Untuk fitur baru, buat issue dengan label "enhancement" yang menjelaskan:

1. Apa yang ingin Anda tambahkan
2. Mengapa fitur ini berguna
3. Mockup atau wireframe jika memungkinkan

### Pull Request Process

1. **Fork repository** ini
2. **Clone** fork Anda: `git clone https://github.com/YOUR_USERNAME/frontend-spotifydownloader.git`
3. **Buat branch** baru: `git checkout -b feature/nama-fitur-anda`
4. **Install dependencies**: `npm install`
5. **Buat perubahan** Anda
6. **Test** di browser (Chrome, Firefox, Safari)
7. **Commit** dengan pesan yang jelas: `git commit -m "Add: fitur xyz"`
8. **Push** ke branch Anda: `git push origin feature/nama-fitur-anda`
9. **Buat Pull Request** ke branch `main`

### Commit Message Guidelines

Gunakan format berikut untuk commit message:

```
Add: menambahkan fitur baru
Fix: memperbaiki bug
Update: memperbarui fitur yang ada
Remove: menghapus fitur/file
Refactor: refactoring code tanpa mengubah fungsionalitas
Docs: update dokumentasi
Style: perubahan styling/CSS
UI: perubahan user interface
```

Contoh:
```
Add: progress bar untuk download status
Fix: layout responsiveness di mobile
Update: improve loading state UI
UI: redesign download button
```

### Code Style

#### JavaScript/Vue
- Gunakan **2 spaces** untuk indentasi
- Gunakan **camelCase** untuk variable dan function names
- Gunakan **PascalCase** untuk component names
- Gunakan **composition API** untuk Vue components
- Tambahkan **comments** untuk logic yang kompleks

#### CSS/Tailwind
- Gunakan **Tailwind utility classes** sebisa mungkin
- Untuk custom CSS, letakkan di `src/assets/`
- Ikuti **mobile-first approach** untuk responsive design
- Gunakan **semantic class names** jika membuat custom CSS

### Testing

Sebelum submit PR, pastikan:

- [ ] Code berjalan tanpa error di console
- [ ] UI responsive di mobile, tablet, dan desktop
- [ ] Test di minimal 2 browser berbeda (Chrome + Firefox/Safari)
- [ ] Tidak ada console warnings
- [ ] Build production berhasil: `npm run build`
- [ ] Tidak ada credentials atau API URLs yang ter-commit di code

### Development Setup

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan URL backend Anda

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Apa yang TIDAK boleh di-commit

- ❌ File `.env` dengan URLs atau configs production
- ❌ Folder `node_modules/`
- ❌ Folder `dist/` hasil build
- ❌ File `.DS_Store` atau temporary files
- ❌ API keys atau tokens

### Project Structure

```
frontend-spotifydownloader/
├── src/
│   ├── App.vue           # Root component
│   ├── main.js           # Entry point
│   ├── assets/           # CSS & static assets
│   ├── plugin/           # Axios & other plugins
│   ├── router/           # Vue Router config
│   └── views/            # Page components
├── public/               # Public assets
├── index.html            # HTML template
├── vite.config.js        # Vite config
├── tailwind.config.js    # Tailwind config
└── README.md
```

### Component Guidelines

Saat membuat Vue component baru:

```vue
<script setup>
// Import statements
import { ref, onMounted } from 'vue'

// Props
const props = defineProps({
  title: String
})

// Reactive state
const isLoading = ref(false)

// Functions
const handleClick = () => {
  // Logic here
}

// Lifecycle hooks
onMounted(() => {
  // Initialization
})
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Template here -->
  </div>
</template>

<style scoped>
/* Custom styles (if needed) */
</style>
```

### UI/UX Guidelines

- Gunakan **consistent spacing** (Tailwind spacing scale)
- Berikan **loading states** untuk async operations
- Tampilkan **error messages** yang user-friendly
- Gunakan **transitions** untuk interaksi yang smooth
- Pastikan **accessibility** (keyboard navigation, ARIA labels, dll)
- **Mobile-first** design approach

### Need Help?

Jika Anda memiliki pertanyaan, silakan:

1. Cek [README.md](README.md) terlebih dahulu
2. Cari di [Issues](https://github.com/rohidtzz/frontend-spotifydownloader/issues) yang sudah ada
3. Buat issue baru jika belum ada jawaban

## Code of Conduct

Proyek ini mengadopsi standar perilaku yang ramah dan inklusif. Dengan berpartisipasi, Anda diharapkan untuk:

- Menggunakan bahasa yang ramah dan inklusif
- Menghormati sudut pandang dan pengalaman yang berbeda
- Menerima kritik konstruktif dengan baik
- Fokus pada yang terbaik untuk komunitas
- Menunjukkan empati terhadap anggota komunitas lainnya

## License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah GPL-3.0-or-later License yang sama dengan proyek ini.
