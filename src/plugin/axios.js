import axios from 'axios'

// Buat instance Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 1800000,  // 30 menit
})

export default api
