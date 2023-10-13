import axios from 'axios'

const blogFetch = axios.create({
    baseURL: 'https://api-diario-teste.vercel.app'
})

export default blogFetch