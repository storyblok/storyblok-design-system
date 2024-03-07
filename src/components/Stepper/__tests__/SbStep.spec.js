import { render, screen, fireEvent } from '@testing-library/vue'
import { steps } from '../constants'
import SbStep from '../components/Step/SbStep.vue'

let wrapper = null
describe('SbStep component tests', () => {
    beforeEach(() => {
        wrapper = render(SbStep, {
            props: {
                step: steps[1],
                stepIndex: 1,
                isActive: true,
                isCompleted: true
            }
        })
    })
    it('should render active step', () => {
        expect(screen.getByRole('step').getAttribute('aria-current')).toBe('step')
        expect(screen.getByRole('step').classList.contains('sb-step--active')).toBeTruthy()
    })
    it('should render completed step', () => {
        expect(screen.getByTestId('completed')).toBeTruthy()
        expect(screen.getByRole('step').classList.contains('sb-step--completed')).toBeTruthy()
    })
    it('should emit event when click action performed on step', async () => {
        const step = screen.getByRole('step')
        await fireEvent.click(step)
        expect(wrapper.emitted('click')).toBeTruthy()
    })
    it('should emit event when keyboard action is performed on step', async () => {
        const step = screen.getByRole('step')
        await fireEvent.keyDown(step)
        expect(wrapper.emitted('step-key-press')[0][1]).toStrictEqual(steps[1])
    })
})