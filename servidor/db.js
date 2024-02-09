console.log('Rodando db.js')

// importa o módulo do banco de dados mysql
import mysql from 'mysql2/promise'

// faz a conexão com o banco de dados
async function conectar(){
    if (global.conexao && global.conexao.state != 'disconnected')
        return global.conexao

    const conexao = mysql.createConnection({
        user: 'root',
        password: 'softgraf',
        host: 'localhost',
        port: 3306,
        database: 'crudmundo'
    })

    console.log('Conectou no MySQL')
    global.conexao = conexao
    return conexao
}

// conectar()

export async function listarProdutos(){
    const con = await conectar()
    console.log(con)
    const sql = 'SELECT * FROM Produtos'
    const [resultado] = await con.query(sql)
    return resultado
}

export async function inserirProduto(produto){
    const con = await conectar()
    const sql = 'INSERT INTO Produtos (descricao, categoria, preco, quantidade, url) VALUES (?, ?, ?, ?, ?)'
    const valores = [produto.descricao, produto.categoria, produto.preco, produto.quantidade, produto.url]
    const retorno = await con.query(sql, valores)
    return retorno[0]
}

// recebe o id do produto para apagar
export async function apagarProduto(id){
    const con = await conectar()   // conecta com o banco
    const sql = 'DELETE FROM Produtos WHERE id=?'
    const retorno = await con.query(sql, id)  // executa comando
    return retorno[0]
}

export async function buscarProdutoPorId(id){
    const con = await conectar()
    const sql = 'SELECT * FROM Produtos WHERE id=?'
    // obtém o primeiro item (dados) da lista
    const [dados] = await con.query(sql, id)
    return dados
}

export async function atualizarProduto(produto){
    const con = await conectar()
    const sql = "UPDATE Produtos SET descricao=?, categoria=?, preco=?, " +
                " quantidade=?, url=? WHERE id=?"
    const valores = [produto.descricao, produto.categoria, produto.preco,
                     produto.quantidade, produto.url, produto.id]
    const retorno = await con.query(sql, valores)
    return retorno[0]
}

export async function listarProdutosPorCategoria(categoria){
    const con = await conectar()
    const sql = 'SELECT * FROM Produtos WHERE categoria=?'
    const [dados] = await con.query(sql, categoria)
    return dados
}

