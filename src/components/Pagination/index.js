import './pagination.scss'

import SbIcon from '../Icon'
import SbTooltip from '../Tooltip'

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
      h('span', {
        staticClass: 'sb-pagination__placeholder'
      }, `of ${this.pages} pages`)
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
    }
  },

  methods: {
    onSelectChange (event) {
      this.$emit('per-page-change', Number(event.target.value))
    }
  },

  render (h) {
    const perPageOptions = [
      factorySelectOption(10, perPage => `Select per page ${perPage} items`),
      factorySelectOption(20, perPage => `Select per page ${perPage} items`),
      factorySelectOption(30, perPage => `Select per page ${perPage} items`),
      factorySelectOption(40, perPage => `Select per page ${perPage} items`)
    ]
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
      h('span', {
        staticClass: 'sb-pagination__placeholder'
      }, '1-10 of 40 items')
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
        h('span', {
          attrs: {
            'data-testid': 'pagination-pages-information'
          }
        }, `${this.value} of ${this.pages} pages`),
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
          perPage: this.perPage
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
