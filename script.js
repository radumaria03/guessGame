document.addEventListener('DOMContentLoaded', () => {
  let winHistory = [];
  let secretNumber = getSecretNumber();
  let gameScore = 10;
  let triesCount = 4;
  let playerLost = '';
  let clickCount = 0;
  let againButton = `<input type="number" class="the-guess" />
          <button class="check-the-guess js-guess-btn">Check</p>`;
  console.log(secretNumber);
  let highScore = 0;
  const questionMark = document.querySelector('.game-question-num');
  const gameScoreText = document.querySelector('.game-score-text');
  const gameContent = document.querySelector('.game-content');
  const questionNum = document.querySelector('.game-question-num');

  function wrongGuessScore() {
    gameScore--;
  }

  function getSecretNumber() {
    let secretNumber = Math.trunc(Math.random() * 20) + 1;
    return secretNumber;
  }

  function updateGussButt() {
    document.querySelector('.js-guess-btn').addEventListener('click', () => {
      let theGuess = document.querySelector('.the-guess');
      let guessValue = Number(theGuess.value);
      let guessResult = '';
      let lostResult = 'Try Again';
      playerLost = `<h2 class="won-txt">YOU LOST</h2>`;
      playerWin = `<h2 class="won-txt">YOU WON</h2>`;
      clickCount++;

      console.log(secretNumber);

      if (secretNumber === guessValue) {
        guessResult = 'You Won';
        gameScore += 20;
        scoreRanking();
        finalScore();
        winBgClass();
        document.querySelector('.game-guess-input').innerHTML = playerWin;

        questionMark.innerHTML = Number(secretNumber);
        questionMark.style.width = '300px';
      } else if (secretNumber !== guessValue) {
        guessResult = secretNumber > guessValue ? 'To Low' : 'To High';
        wrongGuessScore();
        triesCount--;
      }

      gameScoreText.innerHTML = guessResult;
      document.querySelector('.game-score-counter').innerHTML = gameScore;
      document.querySelector('.js-tries').innerHTML = triesCount;

      function finalScore() {
        if (guessResult === 'You Won') {
          finalScore = gameScore;
          winHistory.push(Number(finalScore));
          console.log(finalScore);
          console.log(winHistory);
        }

        if (finalScore > highScore) {
          highScore = finalScore;
          document.querySelector('.game-highscore-counter').innerText =
            highScore;
        }
      }

      function scoreRanking() {
        if (clickCount == 1) {
          gameScore += 50;
        } else if (clickCount == 2) {
          gameScore += 30;
        } else if (clickCount == 3) {
          gameScore += 20;
        } else {
          gameScore += 0;
        }
      }

      if (triesCount == 0) {
        document.querySelector('.game-score-text').innerHTML = lostResult;
        document.querySelector('.js-tries').innerHTML = 4;
        document.querySelector('.game-guess-input').innerHTML = playerLost;
        getSecretNumber();
        triesCount = 4;
      }
    });
  }

  document.querySelector('.game-guess-input').innerHTML = againButton;
  updateGussButt();

  document.querySelector('.again-button').addEventListener('click', () => {
    document.querySelector('.game-guess-input').innerHTML = againButton;
    document.querySelector('.js-tries').innerHTML = 4;
    gameScoreText.innerHTML = 'Start Guessing...';
    triesCount = 4;
    secretNumber = getSecretNumber();
    gameScore = 10;
    updateGussButt();
    normalBgClass();
    document.querySelector('.game-question-num').innerHTML = '?';
    questionMark.style.width = '200px';
  });

  function winBgClass() {
    gameContent.classList.remove('normal-bg');
    gameContent.classList.add('win-bg');

    questionNum.classList.remove('num-bg');
    questionNum.classList.add('secret-num-bg');
  }

  function normalBgClass() {
    gameContent.classList.remove('win-bg');
    gameContent.classList.add('normal-bg');

    questionNum.classList.remove('secret-num-bg');
    questionNum.classList.add('num-bg');
  }
});
