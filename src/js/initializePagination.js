import Pagination from 'tui-pagination';
import { getMovies } from './getMovies';
import { options } from './optionsPagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createFilmCard } from './filmCards';
import { currentSearchQuery } from './searchForm';
import './pagination.css';

export async function createPagination() {
  const pagination = new Pagination('pagination', options);

  pagination.on('afterMove', onPaginationClick);

  async function onPaginationClick(e) {
    try {
      const lastPageNumber = getLastPageNumber();
      const selectedPage = e.page;
      if (selectedPage > 1 && selectedPage <= lastPageNumber) {
        hideBtn(selectedPage);
      }

      const dataResponse = await fetchMovies(currentSearchQuery, selectedPage);
      console.log(dataResponse);

      createFilmCard(dataResponse);
      scrollToTop();
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  function hideBtn(selectedPage) {
    const firstPageBtnRef = document.querySelector('.custom-class-first');
    const lastPageBtnRef = document.querySelector('.custom-class-last');
    const lastPageNumber = getLastPageNumber();

    firstPageBtnRef.classList.toggle('btn-hidden', selectedPage < 4);
    lastPageBtnRef.classList.toggle(
      'btn-hidden',
      lastPageNumber - selectedPage < 3
    );
  }

  function getLastPageNumber() {
    return Number(document.querySelector('.tui-ico-last').textContent);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
