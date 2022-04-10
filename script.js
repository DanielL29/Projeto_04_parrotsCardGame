let cardsAmount = Number(prompt('Bem vindo ao Parrot Card Game! Insira numeros pares de 4 a 14 para começar.'))
let gifsArray = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot']
let defaultArray = [...gifsArray]
let clickCounter = 0, selectedCounter = 0
let firstActived, secondActived, interval, restart
let timer = document.querySelector('.clock')
const cards = document.querySelector('.cards')

startOrRestartGame()
clock()

function clock() { interval = setInterval(() => timer.innerHTML++, 1000) }
function shuffleCards() { return Math.random() - 0.5 }

function startOrRestartGame() {
    while (isNaN(cardsAmount) || cardsAmount < 4 || cardsAmount > 14 || cardsAmount % 2 !== 0) {
        cardsAmount = Number(prompt('Insira apenas NUMEROS PARES de 4 a 14!'))
    }
    sortGifs()
}

function sortGifs() {
    gifsArray = [...defaultArray]
    gifsArray.sort(shuffleCards)
    gifsArray = gifsArray.slice(0, (cardsAmount / 2))
    gifsArray = gifsArray.concat(gifsArray)
    gifsArray.sort(shuffleCards)
    addCardsQuantity()
}

function addCardsQuantity() {
    for (let i = 0; i < gifsArray.length; i++) {
        cards.innerHTML += `
            <div class="card" onclick="activeCard(this)">
                <div class="front-face face">
                    <img src="images/front.png" alt="front">
                </div>
                <div class="back-face face">
                    <img src="images/${gifsArray[i]}.gif" alt="${gifsArray[i]}">
                </div>
            </div>
        `
    }
}

function activeCard(element) {
    if(selectedCounter === 0) {
        firstActived = element
        firstActived.classList.add('active')
        selectedCounter++, clickCounter++
    } else if(selectedCounter === 1) {
        secondActived = element
        secondActived.classList.add('active')
        selectedCounter++, clickCounter++
        setTimeout(verifyMatch, 1000)
    } 
}

function verifyMatch() {
    if(firstActived.querySelector('.back-face img').src !== secondActived.querySelector('.back-face img').src) {
        firstActived.classList.remove('active'), secondActived.classList.remove('active')
        selectedCounter = 0
    } else selectedCounter = 0

    if (document.querySelectorAll('.active').length === cardsAmount) finishGame()
}

function finishGame() {
    alert(`Você ganhou em ${clickCounter} jogadas e ${timer.innerHTML} segundos!`)

    do {
        restart = prompt('Gostaria de reiniciar a partida? (Por favor digite sim ou não)').toLowerCase()
    } while(restart !== 'não' && restart !== 'sim')

    if(restart === 'sim') resetVariables() 
    else if(restart === 'não') {
        clearInterval(interval)
        alert('Fim do jogo!')
    }
}

function resetVariables() {
    clickCounter = 0
    gifsArray = []
    timer.innerHTML = "-1"
    cards.innerHTML = ''
    cardsAmount = Number(prompt('Insira numeros pares de 4 a 14'))
    startOrRestartGame()
}