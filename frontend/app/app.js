// Load icons
const requireAll = (r) => r.keys().forEach(r)
requireAll(require.context('./icons', true, /\.svg$/))
import svg4everybody from 'svg4everybody'
import SvgUse from './js/svgUse'
import "./styles/icons.pcss"

import "./styles"

// Load components
import "./components/button"

import Modals from '../app/js/modals'
import SlidersCollection from "./js/sliders";

window.App = {
  debug: !!window.location.port,
}

window.svg4everybody = svg4everybody

document.addEventListener('DOMContentLoaded', () => {
  new SvgUse()

  App.Modals = new Modals()
  App.Sliders = new SlidersCollection()
})
