import { fetchGenres } from './fetchGenres.js';
import { getMovies } from './getMovies.js';
import { openFilmModal } from './openFilmModal.js';

function getGenreNames(genreIds) {
  return genreIds
    .map(id => genres.find(genre => genre.id === id)?.name || 'Unknown')
    .filter(name => name !== 'Unknown')
    .join(', ');
}

function getReleaseYear(response) {
  if (response.media_type === 'movie') {
    return response.release_date
      ? response.release_date.split('-')[0]
      : 'Unknown Year';
  }
  if (response.media_type === 'tv') {
    return response.first_air_date
      ? response.first_air_date.split('-')[0]
      : 'Unknown Year';
  }
  return 'Unknown Year';
}

function getTitle(response) {
  if (response.media_type === 'tv') {
    return response.name || response.original_name || 'Unknown Title';
  }
  return response.title || response.original_title || 'Unknown Title';
}

export async function createFilmCard(dataPromise) {
  const movieCard = document.querySelector('.movie-wrapper');
  const data = await dataPromise;

  movieCard.textContent = '';

  if (!data?.results) return;

  data.results.forEach(response => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-wrapper__card');

    const title = getTitle(response);
    const genreNames = getGenreNames(response.genre_ids);
    const releaseYear = getReleaseYear(response);
    const rating =
      typeof response.vote_average === 'number'
        ? response.vote_average.toFixed(2)
        : 'N/A';
    const posterPath = response.poster_path
      ? `https://image.tmdb.org/t/p/w500${response.poster_path}`
      : 'path/to/default/image.jpg';

    movieElement.setAttribute('data-filmId', response.id.toString());

    movieElement.innerHTML = `
        <div class="movie-wrapper__card-img">
          <img src="${posterPath}" alt="${title}">
          <span class="movie-wrapper__info-rating">${rating}</span>
        </div>
        <div class="movie-wrapper__footer">
          <div class="movie-wrapper__title">${title}</div>
          <div class="movie-wrapper__info">
            <p class="movie-wrapper__info-genres">${genreNames}</p>
            <span class="movie-wrapper__info-year"> | ${releaseYear}</span>
          </div>
        </div>`;

    movieCard.append(movieElement);

    movieElement.addEventListener('click', () => {
      document.querySelector('.film-modal')?.remove();
      openFilmModal(response, movieElement.outerHTML);
    });
  });
}
