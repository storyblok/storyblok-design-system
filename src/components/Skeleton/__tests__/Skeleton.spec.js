import SbSkeleton from '../index'
import { render } from '@testing-library/vue'

describe('SbSkeleton', () => {
  it('renders with custom width', () => {
    const { html } = render(SbSkeleton, {
      props: {
        width: '50%',
      },
    })
    expect(html()).toContain('width: 50%;')
  })

  it('renders with custom height', () => {
    const { html } = render(SbSkeleton, {
      props: {
        height: '20px',
      },
    })
    expect(html()).toContain('height: 20px;')
  })

  it('renders with custom size', () => {
    const { html } = render(SbSkeleton, {
      props: {
        size: '3rem',
      },
    })
    expect(html()).toContain('height: 3rem;')
    expect(html()).toContain('width: 3rem;')
  })

  it('renders with custom shape', () => {
    const { html } = render(SbSkeleton, {
      props: {
        shape: 'circle',
      },
    })
    expect(html()).toContain('sb-skeleton--circle')
  })
})
