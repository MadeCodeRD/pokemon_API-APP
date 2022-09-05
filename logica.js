// global variables targeting the DOM.
const pokemonInput = document.getElementById('pokemon');
const pokemonForm = document.getElementById('pokemon-form');
const imgContainer = document.getElementById('pokemon-img');
const h4List = document.querySelectorAll('h4');
const estadistica = document.getElementById('stats');
const movements = document.getElementById('movements');
const pokemonInfoContainer = document.querySelector('.container');
const pokeball = document.querySelector('.pokeball');
const audio = document.createElement('audio');
audio.setAttribute('src', './assets/Pokeball-Animation.mp3');
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];

// This function makes an API call to extract some information 
// and present it to the user
pokemonForm.addEventListener('submit', (e) => {
  e.preventDefault();

  pokeBallEffect();

  setTimeout(() => {
    const pokemon = pokemonInput.value.toLowerCase();
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    fetch(URL)
      .then((response) => response.json())
      .then((result) => {
        imgContainer.src = `${result.sprites['front_default']}`;

        h4List.forEach((h4) => {
          if (h4.dataset.id === '0') {
            h4.innerHTML = `${result.name}`;
            return;
          } else if (h4.dataset.id === '1') {
            h4.innerHTML = `${result.types[0].type.name}`;
            return;
          } else if (h4.dataset.id === '2') {
            h4.innerHTML = `${result.height}`;
            return;
          } else {
            h4.innerHTML = `${result.weight}`;
            return;
          }
        });

        estadistica.innerHTML = '';
        movements.innerHTML = '';

        result.stats.forEach((pokemonStat) => {
          estadistica.innerHTML += `<option value=${pokemonStat.stat.name}> ${pokemonStat.stat.name}: ${pokemonStat['base_stat']} </option>`;
        });

        result.moves.forEach((pokemonMove) => {
          movements.innerHTML += `<option value=${pokemonMove.move.name}> ${pokemonMove.move.name}</option>`;
        });

        pokemonInfoContainer.classList.add('show-container');
        pokeball.style.display = 'none';
        audio.pause();
      })
      .catch((error) => {
        pokeball.style.display = 'none';
        modal.style.display = 'block';
      });
  }, 3000);
});

// This function shows a pokeball while we wait for the data to be fetch
// from the API
const pokeBallEffect = () => {
  audio.play();
  audio.volume = 0.1;
  pokeball.style.display = 'block';
  pokemonInfoContainer.classList.remove('show-container');
};

span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
