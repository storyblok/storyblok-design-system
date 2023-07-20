<template>
  <SbTag
    v-if="item"
    tabindex="0"
    :closable="!isDisabled"
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
      />
      <span class="sb-select-inner__tag" :title="getTagTitle(item)">
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

  <SbTag v-if="showTagCount" type="primary"> +{{ valueTagCount }} </SbTag>
</template>

<script>
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
      default: () => {},
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
  },

  emits: ['keydown', 'close'],

  methods: {
    getSource(label) {
      if (label?.src) {
        return label.src
      }
      return ''
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
