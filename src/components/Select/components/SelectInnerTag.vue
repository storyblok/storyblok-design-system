<template>
  <SbTag
    v-if="item"
    tabindex="0"
    :closable="!isDisabled"
    :data-testid="`${dataTestid}-tag`"
    @keydown="$emit('keydown', $event, item)"
    @close="$emit('close', $event, item)"
  >
    <template v-if="item">
      <SbAvatar
        v-if="isTagAvatarVisible"
        :key="item[itemLabel]"
        :src="getSource(item)"
        size="small"
        :name="item[itemLabel]"
        :data-testid="`${dataTestid}-avatar`"
      />
      <span
        class="sb-select-inner__tag"
        :title="getTagTitle(item)"
        :data-testid="`${dataTestid}-inner-tag`"
      >
        <template v-if="showCaption">
          {{ item[itemLabel] }}
          <span v-if="item[itemCaption]">({{ item[itemCaption] }})</span>
        </template>
        <template v-else>
          {{ item[itemLabel] || item }}
        </template>
      </span>
    </template>
  </SbTag>

  <SbTag v-if="showTagCount" v-tooltip="tagsCountTooltip" type="primary">
    +{{ valueTagCount }}
  </SbTag>
</template>

<script lang="ts">
import SbTag from '../../Tag'
import SbAvatar from '../../Avatar'

export default {
  name: 'SelectInnerTag',

  components: {
    SbTag,
    SbAvatar,
  },

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    itemLabel: {
      type: String,
      default: 'label',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    itemCaption: {
      type: String,
      default: 'path',
    },
    showCaption: {
      type: Boolean,
      default: false,
    },
    valueTagCount: {
      type: String,
      default: '',
    },
    isTagAvatarVisible: {
      type: Boolean,
      default: false,
    },
    showTagCount: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    tagsCountTooltip: {
      type: Object,
      required: true,
    },
  },

  emits: ['keydown', 'close'],

  computed: {
    dataTestid() {
      return this.$attrs['data-testid'] || 'sb-select-inner-tag'
    },
  },

  methods: {
    getSource(label) {
      return label?.src || ''
    },

    getTagTitle(tagLabel) {
      const label = tagLabel[this.itemLabel] || tagLabel

      if (this.showCaption) {
        const caption = tagLabel[this.itemCaption]
        return caption ? `${label} (${caption})` : `${label}`
      }

      return label
    },
  },
}
</script>
