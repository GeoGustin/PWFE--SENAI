const mongoose = require('mongoose')

                    // collection ('tabela')
const Post = mongoose.model('Post', {
    title: String,
    body: String,
    author: String,
    category: String,
})

module.exports = Post