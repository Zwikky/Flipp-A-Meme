document.addEventListener('DOMContentLoaded', ()=> {
    // card options

    const cardArray = [
        {
            name: 'meme1',
            img: 'images/meme1.jpg'
        },  
        {
            name: 'meme1',
            img: 'images/meme1.jpg'
        },  
        {
            name: 'meme2',
            img: 'images/meme2.jpg'
        },
        {
            name: 'meme2',
            img: 'images/meme2.jpg'
        },
        {
            name: 'meme3',
            img: 'images/meme3.jpg'
        },
        {
            name: 'meme3',
            img: 'images/meme3.jpg'
        },
        {
            name: 'meme4',
            img: 'images/meme4.jpg'
        },
        {
            name: 'meme4',
            img: 'images/meme4.jpg'
        },
        {
            name: 'meme5',
            img: 'images/meme5.jpg'
        },
        {
            name: 'meme5',
            img: 'images/meme5.jpg'
        },
        {
            name: 'meme6',
            img: 'images/meme6.jpg'
        },
        {
            name: 'meme6',
            img: 'images/meme6.jpg'
        },
    ]

    cardArray.sort(()=> 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []


    //create board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/board.jpg')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard) 
            grid.appendChild(card)
            
        }
    }

    //check for matched
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('YEBO!!! Meme Matched')
            cards[optionOneId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].setAttribute('src', 'images/white.png')
            cardsWon.push(cardsChosen)
            
        } else {
          cards[optionOneId].setAttribute('src', 'images/board.jpg')  
          cards[optionTwoId].setAttribute('src', 'images/board.jpg')
          alert('OOPS!!! Sorry, Try Again')  
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length

        if (cardsWon.length === cardArray/2) {
            resultDisplay.textContent = 'Congratulations!!! All Memes Matched'
        }
    }

    //flip a card

    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name) 
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard()
})