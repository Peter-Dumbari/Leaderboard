import BASE_API_URL from './BaseUrl.js';

const recentScores = (name, score, index) => {
  const li = document.createElement('li');
  li.innerHTML = `${index + 1}. ${name} ${score}`;
  return li;
};

const getGame = async (id) => {
  const response = await fetch(`${BASE_API_URL}games/${id}/scores/`);
  const data = await response.json();
  return data.result;
};

const addScore = async (name, score, id) => {
  if (name !== undefined && score !== undefined) {
    const response = await fetch(`${BASE_API_URL}games/${id}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: name, score }),
    });
    const data = await response.json();
    return data.result;
  }
  return null;
};

export { addScore, getGame, recentScores };
