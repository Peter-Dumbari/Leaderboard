import './style.css';
import addSccore from './modules/addScore.js';

const name = document.getElementById('name');
const score = document.getElementById('score');
const ul = document.querySelector('.recent_scores_ul');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const $name = name.value;
  const $score = score.value;
  if ($name !== '' && $score !== '') {
    addSccore($name, $score, ul);

    score.value = '';
    name.value = '';
  }
});
