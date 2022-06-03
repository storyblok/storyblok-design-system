import { sbTranslations } from '../../../src/mixins/translation-mixin'
import './translations.scss'

const sbTranslationsFormatted = JSON.stringify(sbTranslations)
  .replaceAll(',"', ',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
  .replace('{', '{<br>&nbsp;&nbsp;&nbsp;&nbsp;')
  .replace('}', '<br>}')

export default {
  title: 'Design System/Base/Tranlations',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'canvas',
  },
}

export const MixinTranslation = () => ({
  template: `
    <section>
      <div class="sb-translation">
        <h1 class="sb-translation__title">Translations</h1>
  
        <h3 class="sb-translation__subtitle">To add the translation of our components it is necessary to create a mixin in the project that uses Design System, with the following structure:</h3>

<pre class="sb-translation__pre">
// your-project/src/mixins/translationDsMixin.js

export default {
    data() {
        return {
            sbTranslations: { 
                of: 'de',
                page: 'página',
            }
        },
    }
}
</pre>

        <h3 class="sb-translation__subtitle">The user will be able to translate this list of texts from the Design System, the values ​​of the tokens below are the default values:</h3>
<pre class="sb-translation__pre">
${sbTranslationsFormatted}
</pre>

<h3 class="sb-translation__subtitle">Now just add the mixin in your vue component that uses some component from the Design system:</h3>

<pre class="sb-translation__pre">
// your-project/src/components/example.vue

import TranslationDsMixin from 'src/mixins/translationDsMixin'
export default {
    name: 'Example',
    mixins: [TranslationDsMixin],
}
</pre>

<h3 class="sb-translation__subtitle">Or set the Global mixin:</h3>
<pre class="sb-translation__pre">
// your-project/src/main.js

import TranslationDsMixin from 'src/mixins/translationDsMixin'

Vue.mixin(translationDsMixin)
</pre>

      </div>
  
    </section>
    `,
})
