// adding global.css to Storybook Preview Area
import '../src/assets/styles/global.scss'
import './preview.css'
import BlokInkPlugin from '../src/main'
import { app } from '@storybook/vue3'

app.use(BlokInkPlugin)

app.config.unwrapInjectedRef = true
