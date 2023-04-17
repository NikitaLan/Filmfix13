import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import {makeGalleryMarkUp} from '../js/makeGalleryMarkUpCard'
import makeRatingColor from './ratingColor'
import {toPageTopOnClick} from '../js/btnUp'

export class Paginator {
  paginationEl = document.getElementById('pagination');
  renderContainer;
  paginator;
  
  options = {
    totalItems: 500,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    usageStatistics: false,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  constructor(renderContainer, fetchCallback) {
    this.fetchCallback = fetchCallback;
    this.renderContainer = renderContainer;
  }

  getResults() {
    return this.data;
  }

  render(data) {
    const result = data.results
    const galleryMarkUp = result.map(makeGalleryMarkUp).join('')
    this.renderContainer.innerHTML = galleryMarkUp;
    makeRatingColor();
    toPageTopOnClick();
  }

  async initPaginator() {
    this.data = await this.fetchCallback(1);
    console.log(this.data);

    if (this.data.results.length === 0) {
      this.paginationEl.style = 'display: none;';
    } else {
      this.paginationEl.style = 'display: block;';
    }

    this.options.totalItems = this.data.total_results;
    this.paginator = new Pagination(this.paginationEl, this.options);

    this.render(this.data);
    
    this.paginator.on('beforeMove', async event => {
      this.data = await this.fetchCallback(event.page);
      this.render(this.data);
    });
  }
}
