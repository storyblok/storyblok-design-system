<template>
  <section class="sb-empty-state" :class="computedClass">
    <div
      v-if="hasIconOrImage"
      class="sb-empty-state__icon"
      :class="{ 'sb-empty-state__icon--rounded': iconRounded }"
    >
      <SbIcon
        v-if="showIcon"
        :name="computedIconName"
        :color="computedIconColor"
        :background-color="computedIconBackground"
      />
      <SbIllustration
        v-else-if="illustrationLink.length"
        :src="illustrationLink"
        :width="illustrationWidth"
      />
      <div v-if="topRightIcon.length" class="sb-empty-state__icon-small">
        <SbIcon :name="topRightIcon" />
      </div>
    </div>
    <h3 class="sb-empty-state__title">{{ title }}</h3>
    <p
      v-if="description"
      :class="[
        'sb-empty-state__text',
        { 'sb-empty-state__text-wide': wideDescription },
      ]"
      v-html="sanitizedDescription"
    />
    <div class="sb-empty-state__buttons">
      <SbLink
        v-if="secondButtonText"
        :href="secondButtonHref"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SbButton
          variant="tertiary"
          :label="secondButtonText"
          :is-disabled="isLoading"
        />
      </SbLink>
      <SbButton
        v-if="buttonText"
        :size="buttonSize"
        variant="primary"
        :icon="buttonIcon"
        :label="buttonText"
        :is-disabled="isLoading"
        @click="$emit('button-click')"
      />
    </div>
    <SbLink
      v-if="linkText && href"
      :href="href"
      class="sb-empty-state__link"
      :label="linkText"
      :icon-right="linkIcon"
      target="_blank"
      rel="noopener noreferrer"
    />
    <router-link
      v-else-if="linkText && !href && routeTo"
      :to="routeTo"
      class="sb-empty-state__router"
    >
      {{ linkText }}
    </router-link>
    <SbButton
      v-else-if="linkText && !href && !routeTo"
      class="sb-empty-state__router"
      variant="primary"
      :icon="linkIcon"
      :label="linkText"
      :is-disabled="isLoading"
      @click="$emit('link-click')"
    />
    <SbLoading v-if="isLoading" name="loading" color="primary" />
  </section>
</template>

<script lang="ts">
import SbIcon from '../Icon'
import SbLink from '../Link'
import SbButton from '../Button'
import SbLoading from '../Loading'
import SbIllustration from '../Illustration'
import DOMPurify from 'dompurify'

export default {
  name: 'SbEmptyState',
  components: {
    SbIcon,
    SbLink,
    SbButton,
    SbLoading,
    SbIllustration,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    noImage: {
      type: Boolean,
      default: false,
    },
    illustrationLink: {
      type: String,
      default:
        'https://a.storyblok.com/f/95975/x/f6ea3e1d2c/workspace-empty.svg',
    },
    illustrationWidth: {
      type: String,
      default: '120px',
    },
    iconName: {
      type: String,
      default: '',
    },
    iconRounded: {
      type: Boolean,
      default: false,
    },
    topRightIcon: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: null,
    },
    secondButtonText: {
      type: String,
      default: null,
    },
    secondButtonHref: {
      type: String,
      default: null,
    },
    linkText: {
      type: String,
      default: null,
    },
    linkIcon: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    routeTo: {
      type: [String, Object],
      default: null,
    },
    buttonIcon: {
      type: String,
      default: 'plus',
    },
    buttonSize: {
      type: String,
      default: 'small',
    },
    small: {
      type: Boolean,
      default: false,
    },
    wideDescription: {
      type: Boolean,
      default: false,
    },
    isSearch: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    fullHeight: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['button-click', 'link-click'],

  computed: {
    computedClass() {
      return {
        'sb-empty-state--small': this.small,
        'sb-empty-state--full': this.fullHeight,
      }
    },

    hasIconOrImage() {
      return (
        (!this.noImage && this.illustrationLink.length) || this.iconName.length
      )
    },

    computedIconName() {
      return this.iconName.length ? this.iconName : 'empty-search-pictogram'
    },

    computedIconColor() {
      return this.iconRounded ? 'primary' : null
    },

    computedIconBackground() {
      return this.iconRounded ? 'primary' : null
    },

    showIcon() {
      return this.iconName.length || this.isSearch
    },
    sanitizedDescription() {
      return DOMPurify.sanitize(this.description)
    },
  },
}
</script>
