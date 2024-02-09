document.addEventListener('DOMContentLoaded', () => {

    // lê o valor do parâmetro id a partir da url
    // Ex: http://localhost:5500/alterar.html?id=8
    const urlParams = new URLSearchParams(window.location.search)  // id=8
    const id = urlParams.get('id')  // 8

    // solicita ao servidor o produto com id=8
    fetch('http://localhost:3000/produtos/' + id)

    // converte a resposta em formato json (JavaScript Object Notation)
    .then(res => res.json())

    // processa os dados da resposta
    .then(data => {

        if (data.length > 0){
            const produto = data[0]  // pega o objeto dentro do array
            preencher_formulario(produto)
        } else
            alerta_erro(`Erro: nenhum produto encontrado com id=${id}`)

            
    // captura erro se houver
    }).catch(() => alerta_erro(`Erro ao buscar produto com id=${id}`))   

})  // fim da função

// preenche os campos do formulário html
const preencher_formulario = (p) => {
    setById('id', p.id)
    setById('descricao', p.descricao)
    setById('categoria', p.categoria)
    setById('preco', p.preco.replace('.', ','))
    setById('quantidade', p.quantidade)
    setById('url', p.url)
}

// funções auxiliares
const setById = (campo, valor) => {
    document.getElementById(campo).value = valor
}

const getById = (campo) => {
    return document.getElementById(campo).value
}

// envia dados do formulário via método PUT
const atualizar = () => {

    if(!validar_formulario())
        return

    // cria um objeto javascript para enviar ao servidor (json)
    const dados = {
        id : getById('id'),
        descricao : getById('descricao'),
        categoria : parseInt(getById('categoria')),
        preco : parseFloat(getById('preco').replace(',', '.')),
        quantidade : parseInt(getById('quantidade')),
        url : getById('url')
    }

    // envia dados para o servidor usando métod PUT
    fetch('http://localhost:3000/produtos', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
        
    // converte resposta do servidor para json
    }).then(res => res.json()
    
    // processa o objeto json retornado
    ).then(data => console.log('Retorno do servidor\n', data)
    
    // redireciona para a página de gerenciamento
    ).then(() => location.href = 'gerenciar.html'

    // se ocorrer algume erro...
    ).catch(erro => alerta_erro(`Erro ao atualizar produto: ${erro}`))
}