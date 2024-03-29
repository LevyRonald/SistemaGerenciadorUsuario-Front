import axios from 'axios'
import provedor from '@/provedor'
const http = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'accept': 'application/json',
        'content': 'application/json'
    }
})

http.interceptors.request.use(function (config){
    const token = provedor.state.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (erro){
    return Promise.reject(erro)
})

export default http