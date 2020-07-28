import SbBadge from './index'

export default {
  title: 'SbBadge',
  component: SbBadge
}

export const Default = () => ({
  components: { SbBadge },
  template: '<SbBadge status="success"/>'
})

export const Status = () => ({
  components: { SbBadge },
  template: `<div>
    <SbBadge status="success"/>
    <SbBadge status="info"/>
    <SbBadge status="warning"/>
    <SbBadge status="error"/>
  </div>`
})

export const StatusWithIcon = () => ({
  components: { SbBadge },
  template: `<div>
    <SbBadge status="success" icon/>
    <SbBadge status="info" icon/>
    <SbBadge status="warning" icon/>
    <SbBadge status="error" icon/>
  </div>`
})

export const OnlyIcon = () => ({
  components: { SbBadge },
  template: `<div>
    <SbBadge status="success" onlyIcon/>
    <SbBadge status="info" onlyIcon/>
    <SbBadge status="warning" onlyIcon/>
    <SbBadge status="error" onlyIcon/>
  </div>`
})

export const SmallWithText = () => ({
  components: { SbBadge },
  template: `<div>
    <SbBadge status="success" is-small text="5"/>
    <SbBadge status="info" is-small text="10"/>
    <SbBadge status="warning" is-small text="25"/>
    <SbBadge status="error" is-small text="0"/>
  </div>`
})
