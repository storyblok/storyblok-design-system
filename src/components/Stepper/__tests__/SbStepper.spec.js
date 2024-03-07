
import { fireEvent, render, screen } from '@testing-library/vue'
import { steps } from '../constants'
import SbStepper from '../SbStepper.vue'
import SbStep from '../components/Step/SbStep.vue'

const renderWithContext = (stepIndex = 0) => {
    return render(SbStepper, {
        props: {
            steps,
            stepIndex,
        },
        global: {
            stubs: {
                SbStep,
            }
        }
    })
}

describe('SbStepper component tests', () => {
    it('should render all steps', () => {
        renderWithContext()

        expect(screen.getAllByRole('step')[0]).toBeTruthy()
        expect(screen.getAllByRole('step')[1]).toBeTruthy()
        expect(screen.getAllByRole('step')[2]).toBeTruthy()
    })
    it('should jump to step based on step index', () => {
        renderWithContext(1)
        expect(screen.getAllByRole('step')[1].getAttribute('aria-current')).toBe('step')
    })
    describe('keyboard events', () => {
        it('should navigate to previous step on `ArrowLeft`', async () => {
            renderWithContext(2)
            const currentStep = screen.getAllByRole('step')[2]
            const previousStep = screen.getAllByRole('step')[1]
            await fireEvent.keyDown(currentStep, {code: 'ArrowLeft'})
            expect(previousStep.tabIndex).toBe(0)
            expect(currentStep.tabIndex).toBe(-1)
        })
        it('should navigate to next step on `ArrowRight`', async() => {
            renderWithContext(2)
            const currentStep = screen.getAllByRole('step')[2]
            const previousStep = screen.getAllByRole('step')[1]
            await fireEvent.keyDown(currentStep, {code: 'ArrowLeft'})
            expect(previousStep.tabIndex).toBe(0)
            expect(currentStep.tabIndex).toBe(-1)
            await fireEvent.keyDown(previousStep, {code: 'ArrowRight'})
            expect(previousStep.tabIndex).toBe(-1)
            expect(currentStep.tabIndex).toBe(0)
        })
        it('should navigate to step on `Enter`', async () => {
            renderWithContext(2)
            const currentStep = screen.getAllByRole('step')[2]
            const previousStep = screen.getAllByRole('step')[1]
            await fireEvent.keyDown(currentStep, {code: 'ArrowLeft'})
            expect(previousStep.tabIndex).toBe(0)
            expect(currentStep.tabIndex).toBe(-1)
            await fireEvent.keyDown(previousStep, {code: 'Enter'})
            expect(previousStep.getAttribute('aria-current')).toBe('step')
        })
        it('should navigate to step on `NumpadEnter`', async () => {
            renderWithContext(2)
            const currentStep = screen.getAllByRole('step')[2]
            const previousStep = screen.getAllByRole('step')[1]
            await fireEvent.keyDown(currentStep, {code: 'ArrowLeft'})
            expect(previousStep.tabIndex).toBe(0)
            expect(currentStep.tabIndex).toBe(-1)
            await fireEvent.keyDown(previousStep, {code: 'NumpadEnter'})
            expect(previousStep.getAttribute('aria-current')).toBe('step')
        })
        it('should navigate to step on `Space`', async () => {
            renderWithContext(2)
            const currentStep = screen.getAllByRole('step')[2]
            const previousStep = screen.getAllByRole('step')[1]
            await fireEvent.keyDown(currentStep, {code: 'ArrowLeft'})
            expect(previousStep.tabIndex).toBe(0)
            expect(currentStep.tabIndex).toBe(-1)
            await fireEvent.keyDown(previousStep, {code: 'Space'})
            expect(previousStep.getAttribute('aria-current')).toBe('step')
        })
    })
    describe('pointer events', () => {
        it('should navigate to step on click', async () => {
            renderWithContext(1)
            const previousStep = screen.getAllByRole('step')[0]
            await fireEvent.click(previousStep)
            expect(previousStep.getAttribute('aria-current')).toBe('step')
        })
    })
})