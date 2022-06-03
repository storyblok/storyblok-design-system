export const sbTranslations = {
  itemsPerPage: 'Items per page:',
  items: 'items',
  selectPerPage: 'Select per page',
  currentPage: 'Current page, Page',
  gotoPage: 'Goto page',
  paginationNavigation: 'Pagination Navigation',
  previousPage: 'Previous page',
  nextPage: 'Next page',
  of: 'of',
  page: 'page',
  current: 'Current',
  goToPage: 'Go to page',
}

export default {
  data(vue) {
    if (vue.$parent.sbTranslations) {
      const newSbTranslations = Object.assign(
        sbTranslations,
        vue.$parent.sbTranslations
      )

      return {
        sbTranslations: newSbTranslations,
      }
    }

    return { sbTranslations }
  },
}
