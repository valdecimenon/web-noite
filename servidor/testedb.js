
import { inserirProduto} from "./db.js";

console.log('Inserindo produto...')

const produto = {
    descricao: 'Creatina',
    categoria: 1,
    preco: 39.99,
    quantidade: 7,
    url: 'suplementos.png'
}

const inseriu = await inserirProduto(produto)
console.log(inseriu)