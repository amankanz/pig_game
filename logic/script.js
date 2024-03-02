// Selecting Elements
const player_0_el = document.querySelector('.player--0');
const player_1_el = document.querySelector('.player--1');
const score_0_el = document.querySelector('#score--0');
const score_1_el = document.getElementById('score--1');

const current_score_0 = document.getElementById('current--0');
const current_score_1 = document.getElementById('current--1');
const total_score_0 = document.getElementById('score--0');
const total_score_1 = document.getElementById('score--1');

const dice_el = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');

// const winner_trophy = document.querySelector('.trophy');

// Starting Condition
let scores, currentScore, activePlayer, playing;
const total_score = 100;

const img = document.createElement('img');

const init_game = function () {
  score_0_el.textContent = 0;
  score_1_el.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // 1. Set all scores to 0
  current_score_0.textContent = 0;
  current_score_1.textContent = 0;
  player_0_el.classList.remove('player--winner');
  player_1_el.classList.remove('player--winner');
  player_1_el.classList.remove('player--winner');
  dice_el.classList.add('hidden');

  // Trophy
  img.remove();

  // Set Player 1 as active player
  player_0_el.classList.add('player--active');
};
init_game();

const switch_player = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player_0_el.classList.toggle('player--active');
  player_1_el.classList.toggle('player--active');
};

const winner = function () {
  img.classList.add('trophy');
  activePlayer === 0
    ? img.classList.add('trophy_0')
    : img.classList.add('trophy_1');
  img.src = `assets/trophy.png`;
  if (scores[activePlayer] >= total_score)
    document.querySelector(`.player--${activePlayer}`).appendChild(img);
};

// Rolling dice functionality
btn_roll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    dice_el.classList.remove('hidden');
    dice_el.src = `assets/dice-${dice}.png`;

    // 3. Check for dice rolled 1
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switch_player();
    }
  }
});

// Holding the current score functionality
btn_hold.addEventListener('click', function () {
  if (playing) {
    // 1. Add Active player's current score to the total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if total score is >= 100
    // If true finish the game
    if (scores[activePlayer] >= total_score) {
      playing = false;
      dice_el.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      winner();
    } else {
      // 3. If false switch to the next player
      switch_player();
    }
  }
});

// Resetting functionality
btn_new.addEventListener('click', init_game);
