import './style.pcss';
import Collection from "../../js/collection";
import {getConfig} from "../../js/utils/getConfig";
//капчи в коллекцию
//validate captcha textarea
//validation method for captcha


export class EventTimer {

    constructor(DomElement, dateEnd) {
        this.instance = DomElement;
        this.outputField = null;
        this.dateEnd = null;
        this.timer = null;
        this.init(dateEnd)
    }

    init(dateEnd) {
        if (typeof new Date(dateEnd) === 'object')
            if (this.instance.querySelector(EventTimerCollection.selectors.timerField)) {
                this.dateEnd = new Date(dateEnd);
                this.outputField = this.instance.querySelector(EventTimerCollection.selectors.timerField)
                this.update()
                this.start()
            } else {
                console.debug(`Not found outputField in ${this.instance}`)
            }
        else
            console.debug(`This Date not correct, ${dateEnd}`)


    }

    start() {
        this.timer = setInterval(() => this.update(), 60 * 1000, this.outputField)
    }

    clear() {
        clearInterval(this.timer);
    }

    remainingDate() {
        const total = this.dateEnd - new Date();
        return {
            total,
            minutes: Math.floor((total / 1000 / 60) % 60),
            hours: Math.floor((total / 1000 / 60 / 60) % 24),
            days: Math.floor(total / 1000 / 60 / 60 / 24)
        }
    }

    update() {
        const addZero = number => number < 10 ? `0${number}` : number;/*utils*/

        const date = this.remainingDate();
        if (date.total > 0) {
            const {minutes, hours, days} = date;
            this.outputField.textContent = `${addZero(minutes)} м : ${addZero(hours)} ч : ${days} д`;
        } else {
            this.clear()
            console.debug(`Timer is over in ${this.instance}`)
        }

    }


}

export default class EventTimerCollection extends Collection {
    static instance = "[data-js-event]"
    static selectors = {
        timerField: '.event-card__timer-start'
    }

    constructor() {
        super();
        this.init();
    }

    init() {
        const timerEls = document.querySelectorAll(EventTimerCollection.instance)
        if (timerEls)
            timerEls.forEach(timer => {
                const {dateStart} = getConfig(timer, EventTimerCollection.instance)
                this.collection = new EventTimer(timer, dateStart) /*dateStart in EventTimer*/
            })
    }
}