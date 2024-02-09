
import express from 'express'   // servidor http
import bodyParser from 'body-parser'
import  {listarProdutos, inserirProduto, apagarProduto, buscarProdutoPorId, atualizarProduto, listarProdutosPorCategoria} from './db.js'

// define a porta onde vai rodar o servidor
const PORTA = 3000   // 1024 a 65535

// cria o servidor
const server = express()

server.use(express.json())
server.use(bodyParser.urlencoded({extend:true}))
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')  // todos podem acessar
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    next()
})


// localhost:3000/
server.get('/', async(req, res) => {
    res.status(200).send('<h1>Página Inicial</h1>')
})

// lista todos os produtos
// localhost:3000/produtos
server.get('/produtos', async(req, res) => {
    const produtos = await listarProdutos()
    res.status(200).json(produtos)
})

// lista produtos por categoria: 0,1,2
server.get('/produtos/categoria/:categoria', async(req, res) => {
    // extrai o parâmetro categoria da requisição recebida
    const {categoria} = req.params
    const produtos = await listarProdutosPorCategoria(categoria)
    res.status(200).json(produtos)
})


// salva um produto no banco de dados
// POST: http://localhost:3000/produtos
server.post('/produtos', async(req, res) => {
    const produto = req.body
    console.log(produto)
    const retorno = await inserirProduto(produto)
    res.status(200).json({'retorno': retorno.affectedRows == 1})
})

// apaga um produto por id
// DELETE: http://localhost:3000/produtos/1
server.delete('/produtos/:id', async(req, res) => {
    const {id} = req.params
    const retorno = await apagarProduto(id)
    return res.status(200).json({'retorno': retorno.affectedRows == 1})
})

// retorna um produto por id
// GET: http://localhost:3000/produtos/1
server.get('/produtos/:id', async(req, res) => {
    const {id} = req.params
    const produto = await buscarProdutoPorId(id)
    return res.status(200).json(produto)
})

// atualiza um produto
// PUT: http://localhost:3000/produtos
server.put('/produtos', async(req, res) => {
    const produto = req.body
    const retorno = await atualizarProduto(produto)
    return res.status(200).json({'retorno': retorno.affectedRows == 1})
})

// roda o servidor na porta 3000
server.listen(PORTA, () => {
    console.log(`Servidor executando na porta ${PORTA}`)
})