import axios from 'axios'

const blogFetch = axios.create({
    baseURL: 'https://api-blog-hepteto.vercel.app'
})

export default blogFetch