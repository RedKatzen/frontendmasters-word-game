const wordLength = 5;
const rounds = 6;
const letters = document.querySelectorAll('.scoreboard-letter');
const loading = document.querySelector('.loading');

// async function to initialize and call the API 
async function init() {
  // initial state of the game
  let currentRow = 0;
  let currentGuess = '';
  let done = false;
  let isLoading = true;

  // get the word from the API
  const res = await fetch('https://words.dev-apis.com/word-of-the-day');
  const {word: wordRes} = await res.json();
  const word = wordRes.toUpperCase();
  const wordParts = word.split('');
  isLoading = false;
  setLoading(isLoading);

  function addLetter(letter) {
    if(currentGuess.length < wordLength) {
      currentGuess += letter;
    } 
    letters[currentRow * wordLength + currentGuess.length - 1].innerText = letter;
  }

  function remoteLetter() {
    if(currentGuess.length > 0) {
      currentGuess = currentGuess.substring(0, currentGuess.length - 1);
      letters[currentRow * wordLength + currentGuess.length].innerText = '';
    }
  }

  function commit() {
    currentRow++;
    currentGuess = '';
  }

  document.addEventListener("keydown", function handleKeyPress(e) {
    if(isLoading || done) {
      return;
    }
    const action = e.key;
    if(action === "Backspace") {
      remoteLetter();
    } else if(action === "Enter") {
      commit();
    } else if(isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
      return;
    }
  });
}

// function with regular expression (regex) to just accept
// one letter character
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

// toggle the class 'hidden' to show/hide the loading txt
function setLoading(isLoading) {
  loading.classList.toggle("hidden", !isLoading);
}

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      obj[array[i]]++;
    } else {
      obj[array[i]] = 1;
    }
  }
  return obj;
}

init();