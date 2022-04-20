import './style.pcss';
import Collection from "../../js/collection";
import {getJs} from "../../js/utils/getJs";
import {getConfig} from "../../js/utils/getConfig";

export class Map {
    constructor(instance) {
        this.instance = instance
        this.map = null;
        this.clusterer = null;
        this.cfg = getConfig(this.instance, MapCollection.instance)
        this.bindEvents()
    }

    init() {
        const hintLayout = ymaps.templateLayoutFactory
            .createClass(`<div class="map__hint">
              <span class="map__hint-title">{{properties.hintTitle}}</span>
              <span class="map__hint-location">{{properties.hintLocation}}</span>
            </div>`)
        this.map = new ymaps.Map(this.instance, this.cfg)
        this.clusterer = new ymaps.Clusterer()
        this.clusterer.add(this.getPoints())
        this.map.geoObjects.add(this.clusterer)
        this.cfg.points.forEach(point => point.options.hintLayout = hintLayout)
    }

    getPoints() {
        return this.cfg.points.map(({coords, properties, options}) => new ymaps.Placemark(coords, properties, options))
    }

    bindEvents() {
        window.ymaps.ready(() => {
            this.init()
        })
    }

}

export default class MapCollection extends Collection {
    static instance = "[data-js-map]"

    constructor() {
        super();
        this.load()
    }

    init() {
        document.querySelectorAll(MapCollection.instance).forEach(el => {
            this.collection = new Map(el)
        })
    }

    load() {
        if (typeof window.ymaps === 'function') {
            this.init()
        } else {
            getJs({src: MapCollection.urlAPI})
                .then(res => {
                    this.init()
                })
                .catch(err => console.debug(err))
        }
    }

    static urlAPI = "https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU"


}