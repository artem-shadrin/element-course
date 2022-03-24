// Load icons
const requireAll = (r) => r.keys().forEach(r)
requireAll(require.context('./icons', true, /\.svg$/))

import svg4everybody from 'svg4everybody'

import SvgUse from "./js/svgUse";
import amount from "./js/amount";
import showLog from "./js/showLog";

import "./styles/styles.pcss"

window.App = {
  debug: !!window.location.port
}
window.svg4everybody = svg4everybody;

document.addEventListener('DOMContentLoaded', () => {
  new SvgUse()

  showLog(amount(3, 5))

})