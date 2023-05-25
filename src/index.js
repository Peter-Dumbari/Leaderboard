import './style.css';
import { addScore, recentScores, getGame } from './modules/addScore.js';
import BASE_API_URL from './modules/BaseUrl.js';

const ul = document.querySelector('.recent_scores_ul');
const form = document.querySelector('form');
const refresh = document.querySelector('.refresh_btn');
let gameId;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const score = document.getElementById('score');
  const $name = name.value;
  const $score = score.value;
  await addScore($name, $score, gameId);

  name.value = '';
  score.value = '';
});

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

refresh.addEventListener('click', async () => {
  const scores = await getGame(gameId);
  ul.innerHTML = '';
  scores.forEach((score) => {
    const li = recentScores(score.user, score.score);
    ul.appendChild(li);
  });
});
