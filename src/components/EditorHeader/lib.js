const sharedProps = {
  languages: {
    type: [Array, String],
    default: 'English',
  },
  users: {
    type: [Array, String],
    default: null,
  },
  actions: {
    type: [Array, String],
    default: null,
  },
  options: {
    type: [Array, String],
    default: null,
  },
  isPublished: {
    type: Boolean,
  },
  hasSaveButton: {
    type: Boolean,
  },
  showPublishedIcon: {
    type: Boolean,
  },
  headerTitle: {
    type: String,
    default: 'API-based & Headless CMS as a Service',
  },
  headerSubTitle: {
    type: String,
    default: 'Updated 15m ago',
  },
}

export { sharedProps }
