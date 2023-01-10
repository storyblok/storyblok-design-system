export default {
  actions: {
    type: Array,
    default: () => [],
  },
  allowSelection: {
    required: false,
    type: Boolean,
    default: false,
  },
  headers: {
    type: Array,
    default: () => [],
  },
  hideHeader: {
    required: false,
    type: Boolean,
    default: false,
  },
  hideLabelActionsBreakpoint: {
    type: Number,
    default: null,
  },
  isLoading: {
    required: false,
    type: Boolean,
    default: false,
  },
  keepSelectedOnChange: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
  selectedItems: {
    type: Array,
    default: () => [],
  },
  selectionMode: {
    required: false,
    type: String,
    default: 'single',
  },
  striped: {
    required: false,
    type: Boolean,
    default: false,
  },
  stickyMenu: {
    required: false,
    type: Boolean,
    default: false,
  },
  hideActionsMenu: {
    type: Boolean,
    default: false,
  },
  isSortIconAlwaysVisible: {
    type: Boolean,
    default: false,
  },
}
