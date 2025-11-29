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

        <!-- Loading Message with Real-time Progress -->
        <div v-if="loading" class="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-200 dark:border-gray-600 shadow-md">
            <div class="flex items-center mb-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                <h3 class="text-lg font-bold text-blue-800 dark:text-blue-300">
                    🎵 {{ progressData.message || 'Sedang Memproses...' }}
                </h3>
            </div>
            
            <!-- Progress Bar -->
            <div v-if="progressData.total > 0" class="mb-4">
                <div class="flex justify-between text-sm text-blue-600 dark:text-blue-300 mb-1">
                    <span>Progress: {{ progressData.current || 0 }} / {{ progressData.total }}</span>
                    <span>{{ progressData.progress || 0 }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                    <div 
                        class="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-out"
                        :style="{ width: (progressData.progress || 0) + '%' }"
                    ></div>
                </div>
            </div>
            
            <!-- Current Track Info -->
            <div v-if="progressData.currentTrack" class="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg mb-3">
                <p class="text-sm text-blue-600 dark:text-blue-300">
                    🎶 <strong>Sedang diproses:</strong> {{ progressData.currentTrack }}
                </p>
            </div>

            <!-- Type-specific Info -->
            <div v-if="type === 'track'" class="space-y-2">
                <div class="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
                    <p class="text-sm text-blue-600 dark:text-blue-300">
                        ⏱️ <strong>Estimasi waktu:</strong> 1-2 menit
                    </p>
                </div>
            </div>
            
            <div v-else-if="type === 'playlist' || type === 'album' || type === 'artist'" class="space-y-2">
                <div class="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
                    <p class="text-sm text-blue-600 dark:text-blue-300">
                        ⏱️ <strong>Estimasi waktu:</strong> 1-2 menit per lagu
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
            // Support URL with optional locale like /intl-id/, /intl-en/, etc.
            spotifyPattern: /^https:\/\/open\.spotify\.com\/(intl-[a-z]{2}\/)?(track|playlist|album|artist)\/[a-zA-Z0-9]+(\?.*)?$/,
            eventSource: null,
            jobId: null,
            progressData: {
                message: 'Memulai...',
                progress: 0,
                total: 0,
                current: 0,
                currentTrack: ''
            }
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
            
            // Group 1 is locale (optional), Group 2 is type
            const match = this.url.match(this.spotifyPattern);
            const matchType = match[2] || match[1]; // Use group 2 if locale exists, otherwise group 1
            let downloadUrl = '';
            
            if(matchType === 'playlist'){
                downloadUrl = '/downloads/playlist';
                this.type = 'playlist';
            } else if(matchType === 'album'){
                downloadUrl = '/downloads/album';
                this.type = 'album';
            } else if(matchType === 'artist'){
                downloadUrl = '/downloads/artist';
                this.type = 'artist';
            } else {
                downloadUrl = '/downloads/track';
                this.type = 'track';
            }

            this.loading = true;
            this.progressData = {
                message: 'Mengirim request...',
                progress: 0,
                total: 0,
                current: 0,
                currentTrack: ''
            };
            
            axios.post('/download', {
                url: this.url
            }).then(response => {
                console.log('Job response:', response.data.job);
                this.jobId = response.data.job.id;
                
                // Check if job already done
                if (response.data.job.status === 'done' && response.data.job.payload) {
                    this.getZip(response.data.job.payload, downloadUrl);
                    return;
                }
                
                // Update progress message based on status
                if (response.data.job.existing) {
                    this.progressData.message = response.data.job.status === 'processing' 
                        ? 'Job sedang diproses...' 
                        : 'Job dalam antrian...';
                }
                
                // Start SSE connection for progress
                this.startProgressTracking(downloadUrl);
            }).catch(error => {
                console.error(error);
                this.errors.url = 'Gagal menghubungi server';
                this.loading = false;
            });
        },
        startProgressTracking(downloadUrl) {
            // Close existing connection if any
            if (this.eventSource) {
                this.eventSource.close();
            }
            
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            
            try {
                this.eventSource = new EventSource(`${baseUrl}/progress/${this.jobId}`);
            } catch (e) {
                console.error('Failed to create EventSource:', e);
                this.checkJobStatus(downloadUrl);
                return;
            }
            
            this.eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('Progress update:', data);
                    
                    // If server says to use polling, switch to polling
                    if (data.usePolling) {
                        console.log('Server requested polling fallback');
                        if (this.eventSource) {
                            this.eventSource.close();
                            this.eventSource = null;
                        }
                        this.checkJobStatus(downloadUrl);
                        return;
                    }
                    
                    // Update progress data
                    this.progressData = {
                        ...this.progressData,
                        ...data
                    };
                    
                    // Handle completion
                    if (data.status === 'done') {
                        this.eventSource.close();
                        this.eventSource = null;
                        
                        if (data.payload) {
                            this.getZip(data.payload, downloadUrl);
                        } else {
                            // Fallback to polling if no payload in SSE
                            this.checkJobStatus(downloadUrl);
                        }
                    }
                    
                    // Handle failure
                    if (data.status === 'failed') {
                        this.eventSource.close();
                        this.eventSource = null;
                        this.errors.url = data.message || 'Download gagal';
                        this.loading = false;
                    }
                } catch (e) {
                    console.error('Error parsing SSE data:', e);
                }
            };
            
            this.eventSource.onerror = (error) => {
                console.error('SSE Error:', error);
                // Fallback to polling on SSE error
                if (this.eventSource) {
                    this.eventSource.close();
                    this.eventSource = null;
                }
                console.log('Falling back to polling...');
                this.checkJobStatus(downloadUrl);
            };
        },
        getZip(name, url){
            this.progressData.message = 'Menyiapkan file zip...';

            axios.get(url, {
                params: { q: name },
                responseType: 'blob'
            }).then(res => {

                const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', `${name}.zip`); 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
                this.loading = false;
                this.progressData = {
                    message: 'Selesai!',
                    progress: 100,
                    total: 0,
                    current: 0,
                    currentTrack: ''
                };
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
    },
    beforeUnmount() {
        // Clean up SSE connection when component is destroyed
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }
}
</script>
