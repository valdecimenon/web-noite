
//                         0             1             2
const tipo_categoria = ['Cereais', 'Suplementos', 'Temperos']

// executa logo após a página gerenciar.html ser carregada
 document.addEventListener('DOMContentLoaded', () => {

    // solicita ao servidor a lista de produtos
    fetch('http://localhost:3000/produtos')

    // converte a resposta em formato json
    .then(res => res.json())

    // pega a resposta e processa os dados
    .then(data => {
        if (data.length == 0)
            alerta_erro('Nenhum produto encontrado no banco de dados')
        else
            adicionarNaTabela(data)
    })

    // se ocorrer um erro
    .catch(erro => alerta_erro(`Erro ao consultar produtos: ${erro}`))
})

// mostra todos os produtos do banco de dados na tabela
const adicionarNaTabela = (dados) => {
    const tabela = document.getElementById('tabela')
 
    dados.forEach(produto => {
        // calcula o número da linha atual da tabela
        const tamanhoTabela = tabela.rows.length

        // insere uma linha abaixo da última na tabela
        const linha = tabela.insertRow(tamanhoTabela)

        // insere as células da linha
        const id = linha.insertCell(0)     // coluna 0

        // adiciona o id do produto no id da linha
        linha.id = produto.id
        id.innerHTML = produto.id

        const descricao = linha.insertCell(1)  // coluna 1
        descricao.innerHTML = produto.descricao

        const categoria = linha.insertCell(2)  // coluna 2
        categoria.innerHTML = tipo_categoria[produto.categoria]

        const preco = linha.insertCell(3)
        preco.innerHTML = parseFloat(produto.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        const quantidade = linha.insertCell(4)
        quantidade.innerHTML = produto.quantidade

        const imagem = linha.insertCell(5)
        const url = produto.url.toLowerCase()

        // se for imagem da web
        if (url.substring(0,4) === 'http')
            imagem.innerHTML = `<img src=${url} width='100' alt='Foto do Produto' class-'img-thumbnail'>`
        // imagem local
        else
            imagem.innerHTML = `<img src=galeria/${url} width='100' alt='Foto do Produto' class-'img-thumbnail'>`

        // botão alterar
        const alterar = linha.insertCell(6)
        alterar.innerHTML = `<a href='alterar.html?id=${produto.id}' class='btn btn-outline-success mt-4'>Alterar</a>`

        // botão excluir
        const excluir = linha.insertCell(7)
        excluir.innerHTML = `<button onclick='excluirDaTabela(${produto.id})' class='btn btn-outline-danger mt-4'>Excluir</button>`
    })
}

// exclui uma linha da tabela e do banco de dados pelo id
const excluirDaTabela = (id) => {

    // envia o id através do método DELETE
    fetch('http://localhost:3000/produtos/' + id, {
        method: 'DELETE'

    }).then(() => document.getElementById(id).remove())

    .catch(erro => alerta_erro(`Erro ao excluir produto: ${erro}`))
}