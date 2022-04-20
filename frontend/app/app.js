// Load icons


import EventTimerCollection from "./components/event-card";

const requireAll = (r) => r.keys().forEach(r)
requireAll(require.context('./icons', true, /\.svg$/))
import svg4everybody from 'svg4everybody'
import SvgUse from './js/svgUse'
import "./styles/icons.pcss"

import "./styles"

// Load components
import "./components/button"
import "./components/header"
import "./components/navigation"
import "./components/event-card"
import "./components/checkbox"
import "./components/footer"
import "./components/grecaptcha"
import "./components/input"
import "./components/lang-switcher"
import "./components/logo"
import "./components/share"
import "./components/map"


import Modals from '../app/js/modals'
import SlidersCollection from "./js/sliders";
import Forms from "./js/forms";
import MapCollection from "./components/map";
//Load modules


window.App = {
    debug: !!window.location.port,
}

window.svg4everybody = svg4everybody

document.addEventListener('DOMContentLoaded', () => {
    new SvgUse()

    App.Modals = new Modals()
    App.Sliders = new SlidersCollection()
    App.Forms = new Forms()
    App.MapCollection = new MapCollection()
    App.EventTimerCollection = new EventTimerCollection()
})
