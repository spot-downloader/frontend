<template>
    <div class="px-8 mt-8 md:px-24 md:mt-24">
        <div class="mb-6">
            <label for="default-input" class="mb-2 text-sm font-medium text-black-900 dark:text-white">URL Track / Playlist / Album / Artist :</label>
            <input type="url" v-model="url" placeholder="https://open.spotify.com/track/4y2tNHMFqwrVK6lNFVLxsO" id="default-input" :class="{ 'border-red-500': errors.url }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p v-if="errors.url" class="mt-1 text-sm text-red-600">{{ errors.url }}</p>
        </div>

        <button :disabled="loading" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="submit">
            Download
        </button>

        <!-- Loading Message -->
        <div v-if="loading" class="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-200 dark:border-gray-600 shadow-md">
            <div class="flex items-center mb-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                <h3 class="text-lg font-bold text-blue-800 dark:text-blue-300">
                    🎵 Sedang Memproses...
                </h3>
            </div>
            
            <div v-if="type === 'track'" class="space-y-2">
                <p class="text-blue-700 dark:text-blue-200 text-base font-medium">
                    ✨ Sedang mendownload track dari Spotify
                </p>
                <div class="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
                    <p class="text-sm text-blue-600 dark:text-blue-300">
                        ⏱️ <strong>Estimasi waktu:</strong> 2-5 menit<br>
                        💡 <strong>Tips:</strong> Biarkan tab ini tetap terbuka sampai selesai
                    </p>
                </div>
            </div>
            
            <div v-else-if="type === 'playlist'" class="space-y-2">
                <p class="text-blue-700 dark:text-blue-200 text-base font-medium">
                    🎶 Sedang mendownload playlist dari Spotify
                </p>
                <div class="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
                    <p class="text-sm text-blue-600 dark:text-blue-300">
                        ⏱️ <strong>Estimasi waktu:</strong> Tergantung jumlah lagu (5-30 menit)<br>
                        💡 <strong>Tips:</strong> Proses berjalan di background, jangan tutup tab ini<br>
                    </p>
                </div>
            </div>

            <div v-else-if="type === 'album'" class="space-y-2">
                <p class="text-blue-700 dark:text-blue-200 text-base font-medium">
                    💿 Sedang mendownload album dari Spotify
                </p>
                <div class="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
                    <p class="text-sm text-blue-600 dark:text-blue-300">
                        ⏱️ <strong>Estimasi waktu:</strong> Tergantung jumlah lagu (5-30 menit)<br>
                        💡 <strong>Tips:</strong> Proses berjalan di background, jangan tutup tab ini<br>
                    </p>
                </div>
            </div>

            <div v-else-if="type === 'artist'" class="space-y-2">
                <p class="text-blue-700 dark:text-blue-200 text-base font-medium">
                    🎤 Sedang mendownload top tracks artist dari Spotify
                </p>
                <div class="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
                    <p class="text-sm text-blue-600 dark:text-blue-300">
                        ⏱️ <strong>Estimasi waktu:</strong> 5-15 menit (10 top tracks)<br>
                        💡 <strong>Tips:</strong> Proses berjalan di background, jangan tutup tab ini<br>
                    </p>
                </div>
            </div>

            <div v-else class="space-y-2">
                <p class="text-blue-700 dark:text-blue-200 text-base font-medium">
                    🔄 Memproses request Anda...
                </p>
                <div class="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
                    <p class="text-sm text-blue-600 dark:text-blue-300">
                        ⏳ Mohon tunggu sebentar...
                    </p>
                </div>
            </div>
            
            <!-- Progress indicator -->
            <div class="mt-4">
                <p class="text-xs text-blue-500 dark:text-blue-400 mt-1 text-center">
                    Sistem sedang bekerja keras untuk Anda! 🚀
                </p>
            </div>
        </div>
    </div>
</template>

<script>

import axios from '../plugin/axios';

export default {
    name: 'HomeView',
    data() {
        return {
            url: '',
            loading: false,
            type: '',
            errors: {},
            spotifyPattern: /^https:\/\/open\.spotify\.com\/(track|playlist|album|artist)\/[a-zA-Z0-9]+(\?.*)?$/,
        }
    },
    methods: {
        validateSpotifyUrl(url){
            
            this.errors = {}
            
            if (!url || url.trim() === '') {
                this.errors.url = 'URL gak boleh kosong kak!'
                return false
            }

            try {
                new URL(url)
            } catch {
                this.errors.url = 'URL harus yang bener yaaa uWu'
                return false
            }

            if (!this.spotifyPattern.test(url)) {
                this.errors.url = 'URL nya juga harus dari Spotify yaaaaaaaa!'
                return false
            }

            return true
        },
        submit() {

            if (!this.validateSpotifyUrl(this.url)) {
                return
            }
            
            const matchType = this.url.match(this.spotifyPattern)[1];
            let url = '';
            
            if(matchType === 'playlist'){
                url = '/downloads/playlist';
                this.type = 'playlist';
            } else if(matchType === 'album'){
                url = '/downloads/album';
                this.type = 'album';
            } else if(matchType === 'artist'){
                url = '/downloads/artist';
                this.type = 'artist';
            } else {
                url = '/downloads/track';
                this.type = 'track';
            }

            this.loading = true;
            axios.post('/download', {
                url: this.url
            }).then(response => {
                this.checkJobStatus(url);
            }).catch(error => {
                console.error(error);
                this.errors.url = 'Gagal menghubungi server';
                this.loading = false;
            });
        },
        getZip(name,url){
            const encodedName = encodeURIComponent(name);

            axios.get(url, {
                params: { q: encodedName },
                responseType: 'blob'
            }).then(res => {

                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${name}.zip`); 
                document.body.appendChild(link);
                link.click();
                this.loading = false;
            }).catch(err => {
                console.error(err);
                this.errors.url = 'Gagal mengunduh file';
                this.loading = false;
            });

        },
        checkJobStatus(url) {
            axios.get('/download', {
                params: { url: this.url }
            }).then(res => {

                if(res.data.job.length > 0 && res.data.job[0].status === 'done' && res.data.job[0].payload){
                    this.getZip(res.data.job[0].payload, url);
                } else {
                    console.log('Job masih diproses, mengecek lagi...');
                    this.loading = true;
                    setTimeout(() => {
                        this.checkJobStatus(url);
                    }, 8000); // Check setiap 8 detik
                }

            }).catch(err => {
                console.error(err);
                this.errors.url = 'Gagal menghubungi server';
                this.loading = false;
            });
        }
    }
}
</script>
