import SbColors from './Colors.vue'

export default {
  title: 'Design/Colors',
  component: SbColors,
}

export const AllColors = () => ({
  components: { SbColors },
  template: `
  <section>
    <div class="sb-color-pallete">
      <h1 class="sb-color-pallete__title">Primary palette</h1>

      <h3 style="font-size: 15px; color: rgb(177, 181, 190); font-weight: 500; margin-bottom: 15px;">Brand Colors</h3>
      <pre><code>
        $teal-50: #f7fdfc;
        $teal-100: #d4f7f3;
        $teal-200: #a4efe5;
        $teal-300: #6fdcd3;
        $teal-400: #45bfb9;
        $teal-500: #24aea9;
        $teal-600: #00b3b0; // basis color
        $teal-700: #057f7f;
        $teal-800: #0a6566;
        $teal-900: #0d5454;
        $teal-950: #003033;
      </code></pre>

      <div class="palette">
      <SbColors color-name="#f7fdfc" name="Teal 50" />
      <SbColors color-name="#d4f7f3" name="Teal 100" />
      <SbColors color-name="#a4efe5" name="Teal 200" />
      <SbColors color-name="#6fdcd3" name="Teal 300" />
      <SbColors color-name="#45bfb9" name="Teal 400" />
      <SbColors color-name="#24aea9" name="Teal 500" />
      <SbColors color-name="#00b3b0" name="Teal 600" />
      <SbColors color-name="#057f7f" name="Teal 700" />
      <SbColors color-name="#0a6566" name="Teal 800" />
      <SbColors color-name="#0d5454" name="Teal 900" />
      <SbColors color-name="#003033" name="Teal 950" />
      </div>



      <br />
      <pre><code>
      $dark-blue-50: #f6f6f9;
      $dark-blue-100: #eeeef2;
      $dark-blue-200: #d7d7e0;
      $dark-blue-300: #b4b8c5;
      $dark-blue-400: #8b91a7;
      $dark-blue-500: #6a728a;
      $dark-blue-600: #535b6e;
      $dark-blue-700: #32467b;
      $dark-blue-800: #2b4169;
      $dark-blue-900: #28395d;
      $dark-blue-950: #1b243f; // basis color
      </code></pre>

      <div class="palette">
      <SbColors color-name="#f6f6f9" name="Dark Blue 50" />
      <SbColors color-name="#eeeef2" name="Dark Blue 100" />
      <SbColors color-name="#d7d7e0" name="Dark Blue 200" />
      <SbColors color-name="#b4b8c5" name="Dark Blue 300" />
      <SbColors color-name="#8b91a7" name="Dark Blue 400" />
      <SbColors color-name="#6a728a" name="Dark Blue 500" />
      <SbColors color-name="#535b6e" name="Dark Blue 600" />
      <SbColors color-name="#32467b" name="Dark Blue 700" />
      <SbColors color-name="#2b4169" name="Dark Blue 800" />
      <SbColors color-name="#28395d" name="Dark Blue 900" />
      <SbColors color-name="#1b243f" name="Dark Blue 950" />
      </div>

    </div>

    <div class="sb-color-pallete">
      <h1 class="sb-color-pallete__title">Neutral Colors</h1>

      <pre><code>
      // gray
      $gray-50: #f6f7f8;
      $gray-100: #ebecee;
      $gray-200: #dbdde2;
      $gray-300: #c3c7cd;
      $gray-400: #b1b5be; // basis color
      $gray-500: #8f93a2;
      $gray-600: #7e8192;
      $gray-700: #717384;
      $gray-800: #5f616e;
      $gray-900: #4f5059;
      $gray-950: #333338;
      </code></pre>

      <div class="palette">
      <SbColors color-name="#f6f7f8" name="Gray 50" />
      <SbColors color-name="#ebecee" name="Gray 100" />
      <SbColors color-name="#dbdde2" name="Gray 200" />
      <SbColors color-name="#c3c7cd" name="Gray 300" />
      <SbColors color-name="#b1b5be" name="Gray 400" />
      <SbColors color-name="#8f93a2" name="Gray 500" />
      <SbColors color-name="#7e8192" name="Gray 600" />
      <SbColors color-name="#717384" name="Gray 700" />
      <SbColors color-name="#5f616e" name="Gray 800" />
      <SbColors color-name="#4f5059" name="Gray 900" />
      <SbColors color-name="#333338" name="Gray 950" />
      </div>

      <br />

      <pre><code>
      $black: #101525;
      $white: #fff;
      </code></pre>

      <div class="palette">
      <SbColors color-name="#101525" name="Black" />
      <SbColors color-name="#fff" name="White" />
      </div>

    </div>

    <div class="sb-color-pallete">
      <h1 class="sb-color-pallete__title">Alert Colors</h1>

      <pre><code>
      $green-50: #eefbf4;
      $green-100: #d7f4e3;
      $green-200: #b2e8cb;
      $green-300: #7fd6ac;
      $green-400: #4bbc8a;
      $green-500: #2db47d; // basis color
      $green-600: #1a8159;
      $green-700: #15674a;
      $green-800: #13523b;
      $green-900: #104432;
      $green-950: #08261d;
      </code></pre>


      <div class="palette">
      <SbColors color-name="#eefbf4" name="Green 50" />
      <SbColors color-name="#d7f4e3" name="Green 100" />
      <SbColors color-name="#b2e8cb" name="Green 200" />
      <SbColors color-name="#7fd6ac" name="Green 300" />
      <SbColors color-name="#4bbc8a" name="Green 400" />
      <SbColors color-name="#2db47d" name="Green 500" />
      <SbColors color-name="#1a8159" name="Green 600" />
      <SbColors color-name="#15674a" name="Green 700" />
      <SbColors color-name="#13523b" name="Green 800" />
      <SbColors color-name="#104432" name="Green 900" />
      <SbColors color-name="#08261d" name="Green 950" />
      </div>

      <br />

      <pre><code>
      $blue-50: #f1f5fd;
      $blue-100: #e0e9f9;
      $blue-200: #c8d9f5;
      $blue-300: #a2c1ee;
      $blue-400: #75a0e5;
      $blue-500: #557fdc;
      $blue-600: #395ece; // basis color
      $blue-700: #3751be;
      $blue-800: #32449b;
      $blue-900: #2d3c7b;
      $blue-950: #1f274c;
      </code></pre>

      <div class="palette">
      <SbColors color-name="#f1f5fd" name="Blue 50" />
      <SbColors color-name="#e0e9f9" name="Blue 100" />
      <SbColors color-name="#c8d9f5" name="Blue 200" />
      <SbColors color-name="#a2c1ee" name="Blue 300" />
      <SbColors color-name="#75a0e5" name="Blue 400" />
      <SbColors color-name="#557fdc" name="Blue 500" />
      <SbColors color-name="#395ece" name="Blue 600" />
      <SbColors color-name="#3751be" name="Blue 700" />
      <SbColors color-name="#32449b" name="Blue 800" />
      <SbColors color-name="#2d3c7b" name="Blue 900" />
      <SbColors color-name="#1f274c" name="Blue 950" />
      </div>

      <br />

      <pre><code>
      $yellow-50: #fffbeb;
      $yellow-100: #fef3c7;
      $yellow-200: #fde58a;
      $yellow-300: #fbce41; // basis color
      $yellow-400: #fabd25;
      $yellow-500: #f49c0c;
      $yellow-600: #d87507;
      $yellow-700: #b3520a;
      $yellow-800: #913f0f;
      $yellow-900: #78340f;
      $yellow-950: #451903;
      </code></pre>

      <div class="palette">
      <SbColors color-name="#fffbeb" name="Yellow 50" />
      <SbColors color-name="#fef3c7" name="Yellow 100" />
      <SbColors color-name="#fde58a" name="Yellow 200" />
      <SbColors color-name="#fbce41" name="Yellow 300" />
      <SbColors color-name="#fabd25" name="Yellow 400" />
      <SbColors color-name="#f49c0c" name="Yellow 500" />
      <SbColors color-name="#d87507" name="Yellow 600" />
      <SbColors color-name="#b3520a" name="Yellow 700" />
      <SbColors color-name="#913f0f" name="Yellow 800" />
      <SbColors color-name="#78340f" name="Yellow 900" />
      <SbColors color-name="#451903" name="Yellow 950" />
      </div>

      <br />

      <pre><code>
      $red-50: #fff2f1;
      $red-100: #ffe2e1;
      $red-200: #ffcac7;
      $red-300: #ffa5a0;
      $red-400: #ff6159; // basis color
      $red-500: #f8443b;
      $red-600: #e5271d;
      $red-700: #c11c14;
      $red-800: #a01b14;
      $red-900: #841d18;
      $red-950: #480a07;
      </code></pre>

      <div class="palette">
      <SbColors color-name="#fff2f1" name="Red 50" />
      <SbColors color-name="#ffe2e1" name="Red 100" />
      <SbColors color-name="#ffcac7" name="Red 200" />
      <SbColors color-name="#ffa5a0" name="Red 300" />
      <SbColors color-name="#ff6159" name="Red 400" />
      <SbColors color-name="#f8443b" name="Red 500" />
      <SbColors color-name="#e5271d" name="Red 600" />
      <SbColors color-name="#c11c14" name="Red 700" />
      <SbColors color-name="#a01b14" name="Red 800" />
      <SbColors color-name="#841d18" name="Red 900" />
      <SbColors color-name="#480a07" name="Red 950" />
      </div>
    </div>
  </section>
  `,
})
