import { getMovies } from './getMovies.js';
import { options } from './optionsPagination.js';
import { footerPagination } from './footerPagination.js';
import { createFilmCard } from './filmCards.js';

let searchQuery = '';
export let currentSearchQuery = '';

export const searchForm = document.querySelector('.search-form');
const searchIcon = document.querySelector('.fa.fa-search'); //HTML --selector buton, dar trebuie schimbat cu SVG

document.addEventListener('DOMContentLoaded', () => {
  const notify = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    console.log(`Notification added: ${message}`); // Log when notification is added
    setTimeout(() => {
      notification.remove();
      console.log(`Notification removed: ${message}`); // Log when notification is removed
    }, 3000);
  };

  searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const userSearchQuery = e.currentTarget.elements.searchQuery.value.trim();

    if (!userSearchQuery) {
      notify('Please enter a search term.', 'failure');
      return;
    }

    currentSearchQuery = userSearchQuery;

    try {
      const moviesData = await getMovies(currentSearchQuery);

      console.log('Datele primite după căutare:', moviesData);

      if (!moviesData || !moviesData.results?.length) {
        notify(`Sorry, we couldn't find any films matching "${currentSearchQuery}". Please try a different search term.`, 'failure');
        return;
      } else {
        notify(`We found ${moviesData.total_results} films matching "${currentSearchQuery}".`, 'success');
      }

      options.totalItems = moviesData.total_results;
      footerPagination(options.totalItems);

      createFilmCard(moviesData);

      searchForm.elements.searchQuery.value = '';
    } catch (error) {
      console.error('Search result is not successful. Enter the correct movie name and press enter', error);
      notify('An error occurred while fetching the movies. Please try again.', 'failure');
    }
  });

  searchIcon.addEventListener('click', () => {
    searchForm.dispatchEvent(new Event('submit'));
  });
});
