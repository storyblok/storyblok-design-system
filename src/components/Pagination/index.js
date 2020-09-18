import './pagination.scss'

import SbIcon from '../Icon'
import SbTooltip from '../Tooltip'

const DEFAULT_ROWS_PER_PAGE_DROPDOWN = [10, 20, 30, 40, 50]

const factorySelectOption = (value, factoryAriaLabel) => {
  return {
    value: value,
    label: value,
    ariaLabel: factoryAriaLabel(value)
  }
}

const buildSelectOptions = (iterations, ...args) => {
  return [...Array(iterations).keys()].map(number => {
    const value = number + 1
    return factorySelectOption(value, ...args)
  })
}

const SbPaginationButton = {
  name: 'SbPaginationButton',

  functional: true,

  props: {
    icon: {
      type: String
    },
    tooltipLabel: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  render (h, { props, listeners, data }) {
    const { icon, tooltipLabel, disabled } = props

    return h(SbTooltip, {
      props: {
        label: tooltipLabel,
        position: 'bottom'
      }
    }, [
      h('button', {
        staticClass: 'sb-pagination__button',
        attrs: {
          disabled,
          ...data.attrs || {}
        },
        class: {
          'sb-pagination__button--disabled': disabled
        },
        on: {
          ...listeners
        }
      }, [
        h(SbIcon, {
          props: {
            name: icon,
            size: 'small'
          }
        })
      ])
    ])
  }
}

const SbPagesContainer = {
  name: 'SbPagesContainer',

  props: {
    pages: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number
    }
  },

  methods: {
    onSelectChange (event) {
      this.$emit('page-change', Number(event.target.value))
    }
  },

  render (h) {
    const pagesOptions = buildSelectOptions(
      this.pages,
      page => `Go to page ${page}`
    )

    return h('div', {
      staticClass: 'sb-pagination__pages-container'
    }, [
      h(SbPaginationSelect, {
        attrs: {
          'data-testid': 'page-select'
        },
        props: {
          options: pagesOptions,
          value: this.currentPage
        },
        on: {
          change: this.onSelectChange
        }
      }),
      h(SbPaginationPagesText, {
        props: {
          pages: this.pages,
          isPlaceholder: true
        }
      })
    ])
  }
}

const SbPaginationSelect = {
  name: 'SbPaginationSelect',

  functional: true,

  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number
    }
  },

  render (h, { props, listeners, data }) {
    const { options } = props

    const processAriaLabel = (option) => {
      const { ariaLabel, value } = option
      return props.value === value ? `${ariaLabel}, Current` : ariaLabel
    }

    return h('select', {
      attrs: { ...data.attrs || {} },
      staticClass: 'sb-pagination__select',
      on: {
        ...listeners
      }
    }, [
      ...options.map(option => {
        return h('option', {
          attrs: {
            ...(option.ariaLabel && { 'aria-label': processAriaLabel(option) }),
            value: option.value,
            selected: props.value === option.value
          }
        }, option.label)
      })
    ])
  }
}

const SbPerPageContainer = {
  name: 'SbPerPageContainer',

  props: {
    perPage: {
      type: Number
    },
    perPageAvailable: {
      type: Array,
      default: () => []
    },
    currentPage: {
      type: Number
    },
    total: {
      type: Number
    },
    pages: {
      type: Number
    }
  },

  methods: {
    onSelectChange (event) {
      this.$emit('per-page-change', Number(event.target.value))
    }
  },

  render (h) {
    const perPageOptions = this.perPageAvailable.map(perPage => {
      return factorySelectOption(
        perPage, value => `Select per page ${value} items`
      )
    })

    return h('div', {
      staticClass: 'sb-pagination__per-page-container'
    }, [
      h('span', 'Itens per page:'),
      h(SbPaginationSelect, {
        attrs: {
          'data-testid': 'per-page-select'
        },
        props: {
          options: perPageOptions,
          value: this.perPage
        },
        on: {
          change: this.onSelectChange
        }
      }),
      h(SbPaginationItemsText, {
        props: {
          total: this.total,
          currentPage: this.currentPage,
          pages: this.pages,
          perPage: this.perPage,
          isPlaceholder: true
        }
      })
    ])
  }
}

const SbPaginationDot = {
  name: 'SbPaginationDot',

  functional: true,

  props: {
    currentPage: {
      type: Number,
      default: false
    },
    page: {
      type: Number,
      required: true,
      default: 1
    }
  },

  render (h, { props, listeners }) {
    const { page, currentPage } = props
    const isCurrent = currentPage === page
    return h('button', {
      staticClass: 'sb-pagination-dot',
      class: {
        'sb-pagination-dot--active': isCurrent
      },
      attrs: {
        page,
        'aria-label': isCurrent ? `Curent page, Page ${page}` : `Goto page ${page}`,
        'aria-current': isCurrent + ''
      },
      on: {
        ...listeners
      }
    })
  }
}

const SbPaginationCarousel = {
  name: 'SbPaginationCarousel',

  props: {
    pages: {
      type: Number,
      required: true,
      default: 10
    },
    currentPage: {
      type: Number,
      required: true,
      default: 1
    }
  },

  methods: {
    onChangePageButton (page) {
      this.$emit('change-page', page)
    }
  },

  render (h) {
    const paginationDots = []

    for (let pageNumber = 1; pageNumber <= this.pages; pageNumber++) {
      paginationDots.push(
        h(SbPaginationDot, {
          props: {
            page: pageNumber,
            currentPage: this.currentPage
          },
          on: {
            click: () => {
              this.onChangePageButton(pageNumber)
            }
          }
        })
      )
    }

    return h('nav', {
      staticClass: 'sb-pagination-carousel-container',
      attrs: {
        role: 'navigation',
        'aria-label': 'Pagination Navigation'
      }
    }, paginationDots)
  }
}

const SbPaginationPagesText = {
  name: 'SbPaginationPagesText',

  functional: true,

  props: {
    pages: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number
    },
    isPlaceholder: {
      type: Boolean,
      default: false
    }
  },

  render (h, { props }) {
    const { currentPage, isPlaceholder, pages } = props
    const hasCurrentPage = currentPage >= 0
    const text = hasCurrentPage
      ? `${currentPage} of ${pages} pages`
      : `of ${pages} pages`

    return h('span', {
      class: {
        'sb-pagination__placeholder': isPlaceholder
      },
      attrs: {
        'data-testid': 'pagination-pages-information'
      }
    }, text)
  }
}

const SbPaginationItemsText = {
  name: 'SbPaginationItemsText',

  functional: true,

  props: {
    pages: {
      type: Number
    },
    perPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number
    },
    isPlaceholder: {
      type: Boolean,
      default: false
    }
  },

  render (h, { props }) {
    const { currentPage, isPlaceholder, pages, perPage, total } = props
    const isTheLastPage = currentPage === pages
    const currentPageItems = (currentPage * perPage)
    const firstCurrentPageItem = currentPage === 1
      ? 1
      : (currentPageItems - perPage) + 1
    const lastCurrentPageItem = currentPage === 1
      ? perPage
      : isTheLastPage
        ? total
        : currentPageItems

    const text = `${firstCurrentPageItem}-${lastCurrentPageItem} of ${total} items`

    return h('span', {
      class: {
        'sb-pagination__placeholder': isPlaceholder
      },
      attrs: {
        'data-testid': 'pagination-items-information'
      }
    }, text)
  }
}

const SbPagination = {
  name: 'SbPagination',

  props: {
    carousel: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    },
    customPerPageOptions: {
      type: Array,
      default: () => []
    },
    isFullWidth: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      required: true
    }
  },

  computed: {
    pages () {
      return Math.ceil(this.total / this.perPage)
    },
    isFirstDisabled () {
      return this.value <= 1
    },
    isLastDisabled () {
      return this.value >= this.pages
    },
    perPageAvailable () {
      if (
        this.customPerPageOptions !== null &&
        (Array.isArray(this.customPerPageOptions) &&
        this.customPerPageOptions.length !== 0)
      ) {
        return this.customPerPageOptions
      }

      return DEFAULT_ROWS_PER_PAGE_DROPDOWN
    }
  },

  methods: {
    handlePreviousPage () {
      if (!this.isFirstDisabled) {
        this.updateValue(this.value - 1)
      }
    },
    handleNextPage () {
      if (!this.isLastDisabled) {
        this.updateValue(this.value + 1)
      }
    },
    onPageChange (page) {
      this.updateValue(page)
    },
    onPerPageChange (perPage) {
      this.$emit('per-page-change', perPage)
      this.updateValue(1)
    },
    updateValue (value) {
      this.$emit('input', value)
    }
  },

  render (h) {
    const leftArrowButton = h(SbPaginationButton, {
      attrs: {
        'data-testid': 'pagination-previous-button'
      },
      props: {
        icon: 'chevron-left',
        tooltipLabel: 'Previous page',
        disabled: this.isFirstDisabled
      },
      on: {
        click: this.handlePreviousPage
      }
    })

    const rightArrowButton = h(SbPaginationButton, {
      attrs: {
        'data-testid': 'pagination-next-button'
      },
      props: {
        icon: 'chevron-right',
        tooltipLabel: 'Next page',
        disabled: this.isLastDisabled
      },
      on: {
        click: this.handleNextPage
      }
    })

    if (this.carousel) {
      return h('div', {
        staticClass: 'sb-pagination',
        class: {
          'sb-pagination--carousel': this.carousel
        }
      }, [
        leftArrowButton,
        h(SbPaginationCarousel, {
          props: {
            pages: this.pages,
            currentPage: this.value
          },
          on: {
            'change-page': this.onPageChange
          }
        }),
        rightArrowButton
      ])
    }

    if (this.compact) {
      return h('div', {
        staticClass: 'sb-pagination',
        class: {
          'sb-pagination--compact': this.compact
        }
      }, [
        leftArrowButton,
        h(SbPaginationPagesText, {
          props: {
            pages: this.pages,
            currentPage: this.value
          }
        }),
        rightArrowButton
      ])
    }

    return h('div', {
      staticClass: 'sb-pagination',
      class: {
        'sb-pagination--full-width': this.isFullWidth
      }
    }, [
      h(SbPerPageContainer, {
        props: {
          total: this.total,
          perPage: this.perPage,
          currentPage: this.value,
          pages: this.pages,
          perPageAvailable: this.perPageAvailable
        },
        on: {
          'per-page-change': this.onPerPageChange
        }
      }),
      h(SbPagesContainer, {
        props: {
          pages: this.pages,
          currentPage: this.value
        },
        on: {
          'page-change': this.onPageChange
        }
      }),
      leftArrowButton,
      rightArrowButton
    ])
  }
}

export default SbPagination
