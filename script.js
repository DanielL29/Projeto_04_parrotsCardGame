
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.onclick = () => {
        card.classList.add('active')
    }
})