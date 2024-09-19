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
import { scrollFunction, backTop } from './js/scrollTopButton.js';
import {footerPagination} from './js/footerPagination.js';
import {optionsPagination} from './js/optionsPagination';
import { fetchGenres} from './js/fetchGenres.js';
import { filmCard } from './js/filmCards.js';