// Defining Constants

const main = document.querySelector('.main');
const moves = document.querySelector('.moves');
const timeCount = document.querySelector('.timeCount');
const cardContainer = document.querySelector('.cardContainer');
const stopButton = document.querySelector('.stopButton');
const startButton = document.querySelector('.startButton');
const result = document.querySelector('#result');
const startResult = document.querySelector('.startResult');


// Defining variables

let cards;
let interval;
let firstCard = false;
let secondCard = false;


// Defininf arry for card display.
const items = [
    { name: "aClub", Image: "aClub.jpg" },
    { name: 'aSpade', Image: 'aSpade.jpg' },
    { name: 'kClub', Image: 'kClub.jpg' },
    { name: 'jSpade', Image: 'aHeart2.jpg' },
    { name: 'aHeart', Image: 'aHeart.jpg' },
    { name: 'jHeart', Image: 'jHeart.jpg' },
    { name: 'joker', Image: 'joker.jpg' },
    { name: 'qHeart', Image: 'qHeart.jpg' },
    { name: 'aDiamonds', Image: 'aDiamonds.jpg' },
    { name: 'drg', Image: 'drg.jpg' },
    { name: 'KDiamonds', Image: 'KDiamonds.jpg' },
    { name: 'qDiamonds', Image: 'qDiamonds.jpg' },
    { name: 'qSpade', Image: 'qSpade.jpg' },
    { name: 'smileFace', Image: 'smileFace.jpg' },
    { name: 'smileFace', Image: 'smileFace.jpg' },




];

// Initial time
let second = 0;
let minute = 0;

let movesCount = 0;
winCount = 0;

//For timer
const timeGenerator = () => {
    second += 1;

    //minute logic
    if (second >= 60) {
        minute += 1;
        second = 0;
    }
    //Formate time before display
    let secondValue = second < 10 ? `0${second}` : second;
    let minuteValue = minute < 10 ? `0${minute}` : minute;

    timeCount.innerHTML = `<span> Time:</span>${minuteValue}:${secondValue}`;

};

// For moves

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span> Moves:</span>${movesCount}`;
}

// Pick random items for Item array

const generateRandom = (size = 4) => {
    let tempArray = [...items];

    // Initialising card value
    let cardValue = [];
    size = (size * size) / 2;

    //Random object sellection
    for (let i = 0; i < size; i++) {
        const randonIndex = Math.floor(Math.random() * tempArray.length);
        cardValue.push(tempArray[randonIndex]);
        //Removing object from temp array
        tempArray.splice(randonIndex, 1);
    }
    return cardValue;
};

const matrixGenerator = (cardValue, size = 4) => {
    cardContainer.innerHTML = "";
    cardValue = [...cardValue, ...cardValue];

    //Suffle

    cardValue.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {

        /* Creating cards
        front side Joker
        back side actual card */

        cardContainer.innerHTML += `
        <div class="cards" data-card-value ="${cardValue[i].name}">
        <div class ="front">?</div>  
        <div class ="back">
        <img src="${cardValue[i].Image}"
        class ="image"/></div>
        </div>`;
    }
    cardContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
    cards = document.querySelectorAll('.cards');
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('matched')) {
                card.classList.add('flipped');
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute('data-card-value');
                }else {
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute('data-card-value');
                    if (firstCardValue === secondCardValue) {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
    
                        firstCard = false;
                        winCount += 1;
    
                        if (winCount == Math.floor(cardValue.length / 2)) {
                            result.innerHTML = `<h1> You Won!</h1> <h4> Moves: ${movesCount}</h4>`;
                            stopGame();
                        }
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
    
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove('flipped');
                            tempSecond.classList.remove('flipped');
    
                        }, 900);
                    }
                }
            }
            
        })
    })


};

startButton.addEventListener('click',()=>{
    movesCount=0;
    second=0;
    minute=0;
    result.classList.add("hide");
    startButton.classList.add('hide');
    stopButton.classList.remove('hide');
    startResult.classList.add('hide');
    interval = setInterval(timeGenerator,1000);
    moves.innerHTML=`<span>Moves: </span> ${movesCount}`
    
    initializer();
    
});

stopButton.addEventListener('click',(stopGame)=()=>{
    result.classList.remove('hide');
    stopButton.classList.add('hide');
    startButton.classList.remove('hide');
    startResult.classList.remove('hide');
    clearInterval(interval);
})


const initializer = () => {
    result.innerHTML = "";
    winCount = 0;
    let cardValue = generateRandom();
    console.log(cardValue);
    matrixGenerator(cardValue);

};  
