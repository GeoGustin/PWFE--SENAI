const router = require('express').Router()
const { append } = require('express/lib/response')
//router - recurso do express para criar um arquivo de rotas

const Post = require('../models/Post')


// ex rotas da API em index.js

// CREATE - cração de dados

// app. -p/-> router. - objeto especial do express
        // enviando dados
router.post('/', async (req, res) => {

    // req.body

    // destructure
    const { title, body, author, category } = req.body

    if(!title) {
        res.status(422).json({error: 'O título é obrigatório!'})
        return // resposta final e não executará mais uma linha - para o programa
    }

    const post = {
        title,
        body,
        author,
        category
    }

    // create (no db)

    try {
        // criando dados
        await Post.create(post)

        res.status(201).json({mensagem: 'Post inserido no sistema com sucesso!'})

    } catch (error){
        res.status(500).json({error: error})
    }

})

// READ -leitura de dados
router.get('/', async (req, res) => {

    try{
        
                        //await - esperar para q todos os dados venham para então enviar para a resposta (res)
                                // .find() -> método para garantir que tds os dados sejam retornados (tds os daods da collection)
        const posts = await Post.find()

        // requisição aceita e executada com sucesso
        res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

            // dado dinâmico
            //express entenderá sempre como diferente
router.get('/:id', async (req, res) => {
    //console.log(req)

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
                                // findOne - método para encontrar apenas um resultado
                                        //{} -> parametros para filtro
                                        // _id: -> mongoDB id
                                                // id -> id que vem da requisição
        const post = await Post.findOne({_id: id})

        // se nao encontrou retorna null
    // se negação de post (se o post não existe)
        if(!post) {
            res.status(422).json({mensagem: 'O post não foi encontrado!'})
            return // resposta final e não executará mais uma linha - para o programa
        }

        // requisição aceita e executada com sucesso
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// UPDATE - atualização de dados (PUT, PATCH)

// PUT - espera um objeto completo para fazer a atualização do sistema(no registro do sistema)
// PATCH - atualização parcial(de um campo só)

// rota de atualização quase igual a rota de resgate de dados
router.patch('/:id', async (req, res) => {
    // pegando o id pela requisição
    const id = req.params.id

    // puxando os dados do body
    const {title, body, author, category} = req.body

    const post = {
        title,
        body,
        author,
        category
    }

    try {
                                                    // que post eu vou atualizar
        const updatedPost = await Post.updateOne({_id: id}, post)
                                                              // usando como segundo argumento a minha atualização (o post)

        // console.log(updatedPost) //para mostrar o matchedCount

        // validação de atualização - verificando se algum dado foi alterado ou não
                        //matchedCount -> propriedade(updatedPost) -  qnts registros ele atualizou
        if(updatedPost.matchedCount === 0){
            res.status(422).json({mensagem: 'O post não foi encontrado!'})
            return
        }
                // deu td certo na minha requisição
        res.status(200).json(post)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// DELETE - deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const post = await Post.findOne({_id: id})

// se negação de post (se o post não existe)
    if(!post) {
        res.status(422).json({mensagem: 'O post não foi encontrado!'})
        return 
    }

    try {

        await Post.deleteOne({_id: id})

        res.status(200).json({messagem: 'Post removido com sucesso!'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router
