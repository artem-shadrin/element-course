import {getJs} from "../utils/getJs";

export default class Masks {
    constructor() {
        this.load();
    }

    init() {

        this.mask('phone', {
            mask: '+{7}(000)000-00-00'
        })
        this.mask('email', {
            mask: /^\S*@?\S*$/
        })

    }

    mask(dataValue, options) {
        const elements = document.querySelectorAll(`[data-mask="${dataValue}"]`) // ищем поля ввода по селектору с переданным значением data-атрибута
        if (!elements) return

        elements.forEach(el => { // для каждого из полей ввода
            window.IMask(el, options) // инициализируем плагин imask для необходимых полей ввода с переданными параметрами маски
        })
    }

    load() {
        if (window.IMask === 'function') {
            this.init()
        } else {
            getJs({src: Masks.urlAPI})
                .then(res => {
                    this.init()
                })
                .catch(err => console.debug(err))
        }
    }

    static urlAPI = "https://unpkg.com/imask"
}