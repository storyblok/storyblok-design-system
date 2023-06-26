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
  spaceStatus: {
    type: String,
    default: 'unpublished',
  },
  hasSaveButton: {
    type: Boolean,
  },
  saveButtonLabel: {
    type: String,
    default: 'Save',
  },
  headerTitle: {
    type: String,
    default: 'API-based & Headless CMS as a Service',
  },
  headerSubTitle: {
    type: String,
    default: null,
  },
  mode: {
    type: String,
    default: 'light',
    validation: (value: string): boolean => {
      return ['light', 'dark'].includes(value)
    },
  },
}

export { sharedProps }
