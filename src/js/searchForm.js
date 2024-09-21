
import { getMovies } from './getMovies.js';
import { options } from './optionsPagination.js';
import { footerPagination } from './footerPagination.js';
import { createFilmCard } from './filmCards.js';

import { getMovies } from './getMovies';
import { options } from './optionsPagination';
import { footerPagination } from './footerPagination';
import { filmCards } from './filmCards';

import Notiflix from 'notiflix';

let searchQuery = '';
export let currentSearchQuery = '';

export const searchForm = document.querySelector('.search-form');
const searchIcon = document.querySelector('.submit-btn'); //HTML --selector buton, dar trebuie schimbat cu SVG

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const userSearchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!userSearchQuery) {
    Notiflix.Notify.failure('Please enter a search term.');
    return;
  }

  currentSearchQuery = userSearchQuery;

  try {
    const moviesData = await getMovies(currentSearchQuery);

    console.log('Datele primite după căutare:', moviesData);

    if (!moviesData || moviesData.results.length === 0) {
      Notiflix.Notify.failure(
        `Sorry, we couldn't find any films matching "${currentSearchQuery}". Please try a different search term.`
      );
      return;
    } else {
      Notiflix.Notify.success(
        `We found ${moviesData.total_results} films matching "${currentSearchQuery}".`
      );
    }

    options.totalItems = moviesData.total_pages;
    footerPagination(options.totalItems);


    createFilmCard(moviesData);

    filmCards(moviesData);


    searchForm.elements.searchQuery.value = '';
  } catch (error) {
    console.error(
      'Search result is not successful. Enter the correct movie name and press enter',
      error
    );
  }
});

searchIcon.addEventListener('click', () => {
  searchForm.dispatchEvent(new Event('submit'));

});
});

