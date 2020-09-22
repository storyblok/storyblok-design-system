import SbColors from '.'

export default {
  title: 'SbColors',
  component: SbColors
}

export const AllColors = () => ({
  components: { SbColors },
  template: `
  <section>
    <div>
      <h1>Primary palette</h1>
      <h1>Brand Colors</h1>

      <SbColors color-name="#00B3B0" name="Teal 100%"/>
      <SbColors color-name="#40C6C4" name="Teal 75%"/>
      <SbColors color-name="#7FD9D7" name="Teal 50%"/>
      <SbColors color-name="#D9F4F3" name="Teal 25%"/>

      <br />

      <SbColors color-name="#1B243F" name="Ink 100%"/>
      <SbColors color-name="#545B6F" name="Ink 75%"/>
      <SbColors color-name="#8D919F" name="Ink 50%"/>
      <SbColors color-name="#C6C8CF" name="Ink 25%"/>

    </div>

    <div>
      <h1>Neutral Colors</h1>

      <SbColors color-name="#B1B5BE" name="Light Gray 100% (text/icon color)"/>
      <br />
      <SbColors color-name="#DFE3E8" name="Light 100% (Stroke color)"/>
      <SbColors color-name="#E7EAEE" name="Light 75%"/>
      <SbColors color-name="#EFF1F3" name="Light 50%"/>
      <SbColors color-name="#F7F8F9" name="Light 25%"/>

    </div>

    <div>
      <h1>Alert Colors</h1>

      <SbColors color-name="#2DB47D" name="Green 100%"/>
      <SbColors color-name="#62C79E" name="Green 75%"/>
      <SbColors color-name="#96D9BE" name="Green 50%"/>
      <SbColors color-name="#CAECDE" name="Green 25%"/>

      <br />

      <SbColors color-name="#395ECE" name="Blue 100%"/>
      <SbColors color-name="#6B87DB" name="Blue 75%"/>
      <SbColors color-name="#9CAEE6" name="Blue 50%"/>
      <SbColors color-name="#CDD7F3" name="Blue 25%"/>

      <br />

      <SbColors color-name="#FBCE41" name="Yellow 100%"/>
      <SbColors color-name="#FCDB71" name="Yellow 75%"/>
      <SbColors color-name="#FDE6A0" name="Yellow 50%"/>
      <SbColors color-name="#FEF3CF" name="Yellow 25%"/>

      <br />

      <SbColors color-name="#FFAC00" name="Orange 100%"/>
      <SbColors color-name="#FFC140" name="Orange 75%"/>
      <SbColors color-name="#FFD57F" name="Orange 50%"/>
      <SbColors color-name="#FFEABF" name="Orange 25%"/>

      <br />

      <SbColors color-name="#FF6159" name="Red 100%"/>
      <SbColors color-name="#FF8983" name="Red 75%"/>
      <SbColors color-name="#FFB0AC" name="Red 50%"/>
      <SbColors color-name="#FFD7D5" name="Red 25%"/>
    </div>
  </section>
  `
})
