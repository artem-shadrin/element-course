import Validation from "./validation";
import FormSend from "./send";

export default class Forms {
    static instance = "[data-js-form]";
    static els = {
        input: "[data-js-input-validate]"
    }
    static stateClasses = {
        invalid: "is-valid"
    }

    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e) {

        if (e.target.matches(Forms.instance)) {
            console.log(1)
            e.preventDefault();
            if (Validation.isValid(e.target)) {
                console.log(2)
                FormSend.send(e.target)
                    .then(
                        json => FormSend.onSuccess(json),
                        err => FormSend.onError(err)
                    )
            }
        }
    }

}