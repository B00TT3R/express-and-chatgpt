import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*', 
      },
})
export default api