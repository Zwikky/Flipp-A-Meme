var Ayoba = getAyoba()

/**
* Determine the mobile operating system and returns the
* proper javascript interface
*/
function getAyoba() {
   var userAgent = navigator.userAgent || navigator.vendor || window.opera;

   // Windows Phone must come first because its UA also contains "Android"
   if (/windows phone/i.test(userAgent)) {
       return null;
   }

   if (/android/i.test(userAgent)) {
       return Android;
   }

   // iOS detection from: http://stackoverflow.com/a/9039885/177710
   if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
       return null; // todo
   }

   return "unknown";
}

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
    const timeLeft = document.querySelector('#time-left')
    const user = document.querySelector("#user-name")
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []

    let currentTime = timeLeft.textContent

    //create board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('input')
            card.setAttribute('src', 'images/board.jpg')
            card.setAttribute('type', 'image')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard) 
            grid.appendChild(card)
            
        }

        setInterval(countDown, 1000); 
    }

    //check for matched
    function checkForMatch() {
        var cards = document.querySelectorAll('input')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('YEBO!!! Meme Matched')
            cards[optionOneId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].setAttribute('src', 'images/white.png')
            cards[optionOneId].setAttribute('disabled', 'true')
            cards[optionTwoId].setAttribute('disabled', 'true')
            cards[optionOneId].s
            cardsWon.push(cardsChosen)

        } else {
          cards[optionOneId].setAttribute('src', 'images/board.jpg')  
          cards[optionTwoId].setAttribute('src', 'images/board.jpg')
          alert('OOPS!!! Sorry, Try Again')  
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length * 100

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

    // count down from 2 minutes

    function countDown() {
       currentTime--

            timeLeft.textContent = currentTime

            if (currentTime === 0) {

                alert('Timeout!!!, Your Score is: ' + cardsWon.length * 100)
                cardsChosen = []
                cardsChosenId = []
                cardsWon = []
                timeLeft.textContent = 0
                clearInterval()
                Ayoba.finish()
            }
    }

    //get user profile
    function onProfileChanged(nickname, avatarPath) {
        currentNickname = nickname
        currentAvatarPath = avatarPath

        user.textContent = currentNickname

      }

    createBoard()
    onProfileChanged(nickname, avatarPath)
    
})