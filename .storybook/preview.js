// adding global.css to Storybook Preview Area
import '../src/assets/styles/global.scss'
import './preview.css'

import Vue from 'vue'
import BlokInkPlugin from '../src/main'

Vue.use(BlokInkPlugin)
