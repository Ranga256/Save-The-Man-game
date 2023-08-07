let keyboard = document.querySelector(".keyboard");
let wordText = document.querySelector(".word-display");
let hintText = document.querySelector(".hint-text b");
let wrongCount = document.querySelector('.guess-text b');
let hangmaxImg = document.querySelector('.hangman-box img');
let gameWon = document.querySelector('.game-modal');
let playAgain = document.querySelector('.content button');

const maxGuesses = 6;

let currentWord, wrongLetterCount, correctLetters;

playAgain.addEventListener('click',getRandomWord);

function resetGame() {
    wrongLetterCount = 0;
    correctLetters = 0;
    gameWon.classList.remove('show');
    hangmaxImg.src = 'images/hangman-0.svg';
    wordText.innerHTML = currentWord.split('').map(()=>`<li class="letter"></li>`).join('');
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wrongCount.innerText = `${wrongLetterCount} / ${maxGuesses}`;
}

function getRandomWord() {
    const { word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    hintText.innerHTML = hint;
    currentWord = word;
    resetGame();
}

for(let i=97;i<123;i++){
    let ele = document.createElement('button');
    ele.innerText = String.fromCharCode(i);
    keyboard.appendChild(ele);
    ele.addEventListener("click", (e)=>startGame(e.target,String.fromCharCode(i)));
}

function startGame(button,clickedLetter) {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index)=>{
            if(letter === clickedLetter){
                correctLetters++;
                wordText.querySelectorAll('li')[index].innerHTML = clickedLetter;
                wordText.querySelectorAll('li')[index].classList.add('guessed');
            }
        })
    }else {
        wrongLetterCount++;
        wrongCount.innerText = `${wrongLetterCount} / ${maxGuesses}`;
        hangmaxImg.src = `images/hangman-${wrongLetterCount}.svg`;
    }
    button.disabled = true;
    if(wrongLetterCount === maxGuesses) {
        document.querySelector(".content h4").innerHTML = 'You Guessed the Incorrect Word!!';
        document.querySelector(".content img").src = 'images/lost.gif';
        gameWon.classList.add('show');
    }else if(correctLetters === currentWord.length){
        document.querySelector(".content h4").innerHTML = 'You Guessed the Correct Word!!';
        document.querySelector(".content img").src = 'images/victory.gif';
        gameWon.classList.add('show');
    }
}

getRandomWord();
