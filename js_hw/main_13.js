const URL = 'http://www.omdbapi.com/?apikey=d2eed295&';
const form = document.forms['search-form'];
const container = document.querySelector('.movies-list');
let timeout = null;

form.addEventListener('input', (event) => {
  event.preventDefault();
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    container.innerHTML = '';
    const query = event.target.value.trim();
    if (!query) return;
    fetchMovie(query);
  }, 500);
});

function printMovie(movie) {
  const { Title, Year, Poster } = movie;

  const markup = `
    <div class="movie">
      <h2>${Title} (${Year})</h2>
      <img src="${Poster}" alt="${Title}">
    </div>
  `;

  container.insertAdjacentHTML('beforeend', markup);
}

async function fetchMovie(query) {
  try {
    const response = await fetch(`${URL}s=${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const movie = data.Search;
    movie.forEach(printMovie);
  } catch (error) {
    console.error('Error fetching movie:', error);
  }
}
