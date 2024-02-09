// envia os dados do formulário via método POST
const salvar = () => {

    if (!validar_formulario())
        return

    // cria um objeto javascript
    const dados = {
        descricao : document.getElementById('descricao').value,
        categoria : parseInt(document.getElementById('categoria').value),
        preco : parseFloat(document.getElementById('preco').value.replace(',', '.')),
        quantidade : parseInt(document.getElementById('quantidade').value),
        url : document.getElementById('url').value
    }

    console.log(dados)

    // envia os dados para o servidor salvar
    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)

    // pega a resposta do servidor e converte em json()
    }).then(res => res.json()
    
    // após convertido, mostra a resposta no console
    ).then(data => console.log('Retorno do servidor:\n', data)

    ).then(() => {
        location.href = 'index.html'

    }).catch(erro => alerta_erro(`Erro ao cadastrar produto: ${erro}`))

}