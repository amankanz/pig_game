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

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close_modal_btn = document.querySelector('.close-modal');
const show_modal_btn = document.querySelector('.btn--guide');

// Starting Condition
let scores, currentScore, activePlayer, playing;
const total_score = 100;

const img = document.createElement('img');
const reset_winner = function () {
  img.classList.remove('trophy');
  img.classList.remove('trophy_0');
  img.classList.remove('trophy_1');
  img.remove();
};

const init_game = function () {
  score_0_el.textContent = 0;
  score_1_el.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current_score_0.textContent = 0;
  current_score_1.textContent = 0;
  player_0_el.classList.remove('player--winner');
  player_1_el.classList.remove('player--winner');
  player_1_el.classList.remove('player--winner');
  dice_el.classList.add('hidden');

  reset_winner();

  show_modal_btn.classList.remove('hidden');

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
  // activePlayer === 1
  //   ? img.classList.add('trophy_1')
  //   : img.classList.add('trophy_0');

  if (activePlayer === 0) {
    img.classList.add('trophy_0');
  } else if (activePlayer === 1) {
    img.classList.add('trophy_1');
    img.classList.remove('trophy_0');
  }
  img.src = `assets/trophy.png`;
  if (scores[activePlayer] >= total_score)
    document.querySelector(`.player--${activePlayer}`).appendChild(img);
};

// Rolling dice functionality
btn_roll.addEventListener('click', function () {
  if (playing) {
    show_modal_btn.classList.add('hidden');

    const dice = Math.trunc(Math.random() * 6) + 1;

    dice_el.classList.remove('hidden');
    dice_el.src = `assets/dice-${dice}.png`;

    // 3. Check for dice rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
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
      switch_player();
    }
  }
});

// Resetting functionality
btn_new.addEventListener('click', init_game);

// GUIDE COMPONENT
const open_modal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const close_modal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

show_modal_btn.addEventListener('click', open_modal);

close_modal_btn.addEventListener('click', close_modal);
overlay.addEventListener('click', close_modal);

// Global Event
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    close_modal();
  }
});
