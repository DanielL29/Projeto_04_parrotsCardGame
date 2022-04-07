let quantityPairs = Number(prompt('Insira numeros pares de 4 a 14'))
let arrayCards = []
let arrayDefault = []
let countClicks = 0
let timer = document.querySelector('.clock')
const cardParent = document.querySelectorAll('.cards > div')

startOrRestartGame()
clock()

function clock() {
    setInterval(() => {
        if(document.querySelectorAll('.active').length < quantityPairs) {
            timer.innerHTML++
        } 
    }, 1000)
    clearInterval(clock)
}

function startOrRestartGame() {
    while (isNaN(quantityPairs) || quantityPairs < 4 || quantityPairs > 14 || quantityPairs % 2 !== 0) {
        quantityPairs = Number(prompt('Insira apenas NUMEROS PARES de 4 a 14!'))
    }
    addCardsQuantity()
}

function addCardsQuantity() {
    while (arrayCards.length < quantityPairs) {
        arrayCards.push(cardParent[arrayCards.length].innerHTML)
    }
    arrayDefault = [...arrayCards]
    arrayCards.sort(shuffleCards)
    showCards()
}

function shuffleCards() {
    return Math.random() - 0.5
}

function showCards() {
    for (let i = 0; i < arrayCards.length; i++) {
        cardParent[i].innerHTML = arrayCards[i]
        cardParent[i].classList.remove('hidden')
    }
}

function checkEqualCard(element) {
    element.classList.add('active')
    countClicks++

    if (document.querySelectorAll('.active').length % 2 === 0) {
        verifyMatch(element)
    } else {
        element.classList.add('firstCard')
    }
}

function verifyMatch(element) {
    if (document.querySelector('.firstCard .back-face img').src !== element.querySelector(' .back-face img').src) {
        element.classList.add('active')
        setTimeout(() => {
            element.classList.remove('active')
            document.querySelector('.firstCard').classList.remove('active')
        }, 1000)
    }
    setTimeout(() => {
        document.querySelector('.firstCard').classList.remove('firstCard')
    }, 1000)

    if (document.querySelectorAll('.active').length === quantityPairs) {
        setTimeout(finishGame, 1000)
    }
}

function finishGame() {
    alert(`Você ganhou em ${countClicks} jogadas e ${timer.innerHTML} segundos!`)
    let restart = prompt('Gostaria de reiniciar a partida? (sim ou não)').toLowerCase()
    if(restart === 'sim') {
        countClicks = 0
        timer.innerHTML = "-1"
        arrayCards = []
        quantityPairs = Number(prompt('Insira numeros pares de 4 a 14'))
        for (let j = 0; j < arrayDefault.length; j++) {
            cardParent[j].innerHTML = arrayDefault[j]
            cardParent[j].classList.add('hidden')
        }
        startOrRestartGame()
    }
}