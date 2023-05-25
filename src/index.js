import './style.css';
import { addScore, recentScores, getGame } from './modules/addScore.js';
import BASE_API_URL from './modules/BaseUrl.js';

const ul = document.querySelector('.recent_scores_ul');
const submitBtn = document.querySelector('#submit');
const form = document.querySelector('form');
const refresh = document.querySelector('.refresh_btn');

let gameId;

// The submit function for form
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const score = document.getElementById('score');
  const $name = name.value;
  const $score = score.value;
  if ($name !== '' && $score !== '') {
    submitBtn.innerHTML = 'Submitting...';
    submitBtn.disabled = true;
    await addScore($name, $score, gameId).then(() => {
      submitBtn.innerHTML = 'Submit';
      submitBtn.disabled = false;
    });

    name.value = '';
    score.value = '';
  }
});

// This function usualy generate unique key used in getting games
const addGame = async () => {
  const storedGameId = localStorage.getItem('Id');
  if (storedGameId) {
    gameId = storedGameId;
  } else {
    const response = await fetch(`${BASE_API_URL}games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'My cool new game' }),
    });
    const data = await response.json();
    const iDmessage = data.result;
    const id = iDmessage.match(/ID: (\w+)/)[1];
    localStorage.setItem('Id', id);
  }
};
addGame();

// This refresh the list when the page mount
const refresher = async () => {
  const scores = await getGame(gameId);
  refresh.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Refresh ';
  ul.innerHTML = '';
  if (scores.length !== 0) {
    scores.forEach((score, index) => {
      const li = recentScores(score.user, score.score, index);
      ul.appendChild(li);
    });
  }
};
refresher();

// This is for refresh button
refresh.addEventListener('click', () => {
  refresher().finally((refresh.innerHTML = 'Refreshing...'));
});
