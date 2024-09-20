'use strict';

import { getMovies } from './js/getMovies.js';
import {
  testFetchMovieTrailer,
  testFetchMovies,
} from './js/testing-get-movies.js';
import { nightMode } from './js/nightMode.js';
import {
  addToStorage,
  getFromStorage,
  removeFromStorage,
} from './js/getLocalStorage.js';
import {
  addToQueue,
  addToWatched,
  updateFilmInStorage,
} from './js/queueWatchedManager.js';

import { modal, btn, closeBtn } from './js/footerModal.js';
// import { scrollFunction, backTop } from './js/scrollTopButton.js';

import footerGetFullYear from './js/footerGetFullYear.js';

window.addEventListener('load', async () => {
  try {
    footerGetFullYear();
    // de pus restul de functii necesare la incarcarea paginii
  } catch (error) {
    console.alert('Eroare la încărcarea filmelor populare:', error);
  }
});
