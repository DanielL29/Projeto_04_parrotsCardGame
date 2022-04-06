let quantityPairs = Number(prompt('Insira numeros pares de 4 a 14'))
let arrayCards = []
// let arrayDefault = [...cards]
const cardParent = document.querySelectorAll('.cards > div')
const cards = document.querySelectorAll('.card')

while (isNaN(quantityPairs) || quantityPairs < 4 || quantityPairs > 14 || quantityPairs % 2 !== 0) {
    quantityPairs = Number(prompt('Insira apenas NUMEROS PARES de 4 a 14!'))
}

(function addCardsQuantity() {
    while (arrayCards.length < quantityPairs) {
        arrayCards.push(cardParent[arrayCards.length].innerHTML.replace('hidden', ''))
    }
    arrayCards.sort(shuffleCards)
    showCards()
})()

function shuffleCards() {
    return Math.random() - 0.5
}

function showCards() {
    for (let i = 0; i < arrayCards.length; i++) {
        cardParent[i].innerHTML = arrayCards[i]
    }
}

function checkEqualCard(element) {
    element.classList.add('active')

    if(document.querySelectorAll('.active').length % 2 === 0) {
        element.classList.add('secondCard')
        setTimeout(verifyMatch, 1000)
    } else {
        element.classList.add('firstCard')
    }   
}

function verifyMatch() {
    if(document.querySelector('.firstCard .back-face img').src !== document.querySelector('.secondCard .back-face img').src) {
        document.querySelector('.firstCard').classList.remove('active')
        document.querySelector('.secondCard').classList.remove('active')
    }
    document.querySelector('.firstCard').classList.remove('firstCard')
    document.querySelector('.secondCard').classList.remove('secondCard')
}