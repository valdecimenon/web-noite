console.log('hello world')
console.log(10 / 0)
console.log(-10 / 0)

const a = 10 / 0 - 10/0
console.log(a)

var b
console.log(b)   // undefined

// arredondamento
const valorHora = 99.555
console.log('Arredondamento para cima: ' + valorHora.toFixed(2))
console.log('Arredondamento para inteiro mais próximo: ' + Math.round(valorHora))
console.log('Arredondamento para baixo: ' + Math.floor(valorHora))
console.log('Arredondamento para cima: ' + Math.ceil(valorHora))

// formatação de moeda
const formatado = valorHora.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})
console.log('Formatação moeda: ' + formatado)

// tipos de variáveis
const texto1 = "Texto com aspas duplas ou simples"
console.log(typeof texto1)    // string

const numero = 123
console.log(typeof numero)      // number

const verdadeiro = true
console.log(typeof verdadeiro)   // boolean

var naoDefinido
console.log(typeof naoDefinido)    // undefined

// comparações
const entrada = "1"
const cidade = 1
console.log(entrada == cidade)   // igual
console.log(entrada === cidade)  // exatamente igual