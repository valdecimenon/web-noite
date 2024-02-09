
document.addEventListener('DOMContentLoaded', () => {

    // lê o parâmetro categoria a partir da url
    // http://localhost:5500/index.html?categoria=0
    const urlParams = new URLSearchParams(window.location.search)
    const categoria = urlParams.get('categoria')   // 0, 1 ou 2
    let url

    if (categoria == null)
        url = 'http://localhost:3000/produtos'  // lista todos produtos
    else
        url = 'http://localhost:3000/produtos/categoria/' + categoria

    // solicita ao servidor a lista de todos os produtos
    fetch(url)



    // converte a resposta em formato json
    .then(res => res.json())

    // processa os dados json
    .then(dados => {
        if (dados.length == 0)
            alerta_erro('Nenhum produto encontrado no banco de dados')
        else
            criarGaleriaProdutos(dados) 

    // captura erro se houver
    }).catch(() => alerta_erro('Erro ao consultar produtos no banco de dados'))

})

// desenha a galeria usando html e css
const criarGaleriaProdutos = (dados) => {

    const galeria = document.getElementById('galeria')

    dados.forEach(p => {

        let url = p.url.toLowerCase()
        if (url.substring(0,4) != 'http'){
            url = 'galeria/' + url
        }
        
        const preco = parseFloat(p.preco).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})

        galeria.innerHTML +=
            `<div class="col">` +
            `<div class="card mb-4" style="width: 18rem;">` +
            `<img src=${url} class="card-img-top" alt="Foto do Produto">` +
            `<div class="card-body">`+
                `<h5 class="card-title">${p.descricao}</h5>` +
                `<h6 class="card-subtitle mb-2 text-muted">${preco}</h6>` +
                `<p class="card-text">Restam: ${p.quantidade}</p>` +
                `<p class="card-text">Cód: ${p.id}</p>` +
                `<a href="#" class="btn btn-primary">Comprar</a>` +
            `</div>` +
            `</div>` +
            `</div>`
})
}

