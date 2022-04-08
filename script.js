let quantityPairs = Number(prompt('Insira numeros pares de 4 a 14'))
let arrayGifs = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot']
let arrayDefault = [...arrayGifs]
let countClicks = 0
let timer = document.querySelector('.clock')
const cards = document.querySelector('.cards')

startOrRestartGame()
clock()

function clock() {
    setInterval(() => {
        if (document.querySelectorAll('.active').length < quantityPairs) {
            timer.innerHTML++
        }
    }, 1000)
    clearInterval(clock)
}

function shuffleCards() {
    return Math.random() - 0.5
}

function startOrRestartGame() {
    while (isNaN(quantityPairs) || quantityPairs < 4 || quantityPairs > 14 || quantityPairs % 2 !== 0) {
        quantityPairs = Number(prompt('Insira apenas NUMEROS PARES de 4 a 14!'))
    }
    sortGifs()
}

function sortGifs() {
    arrayGifs = [...arrayDefault]
    arrayGifs.sort(shuffleCards)
    arrayGifs = arrayGifs.slice(0, (quantityPairs / 2))
    arrayGifs = arrayGifs.concat(arrayGifs)
    arrayGifs.sort(shuffleCards)
    addCardsQuantity()
}


function addCardsQuantity() {
    for (let i = 0; i < arrayGifs.length; i++) {
        cards.innerHTML += `
            <div class="card" onclick="checkEqualCard(this)">
                <div class="front-face face">
                    <img src="images/front.png" alt="front">
                </div>
                <div class="back-face face">
                    <img src="images/${arrayGifs[i]}.gif" alt="${arrayGifs[i]}">
                </div>
            </div>
        `
    }
}

function checkEqualCard(element) {
    if(!element.classList.contains('active')) {
        countClicks++
    }

    if(document.querySelectorAll('active').length < 2) {
        element.classList.add('active')
    } else return


    if (document.querySelectorAll('.active').length % 2 === 0) {
        verifyMatch(element)
    } else {
        element.classList.add('firstCard')
    }
}

function verifyMatch(element) {
    if (document.querySelector('.firstCard .back-face img').src !== element.querySelector('.back-face img').src) {
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
    
    if (restart === 'sim') {
        resetVariables()
    }
}

function resetVariables() {
    countClicks = 0
    arrayGifs = []
    timer.innerHTML = "-1"
    cards.innerHTML = ''
    quantityPairs = Number(prompt('Insira numeros pares de 4 a 14'))
    startOrRestartGame()
}