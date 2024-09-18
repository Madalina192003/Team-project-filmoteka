'use strict';

import { getMovies } from './js/get-movies.js';
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
