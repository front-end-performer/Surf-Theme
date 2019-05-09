import './menu_mobile.less';

const OPEN_STATE_CLASS_NAME = 'open';

class Menu {
    constructor(cssSelector) {
        this.rootElement = document.querySelector(cssSelector);
        this.btn = this.rootElement.querySelector('.btn_trigger');

        this.isShown = true;
        this.render();

        this.btn.addEventListener('click', this.render.bind(this));
    }

    render() {
        this.toggleAll();
    }

    hide() {
        this.isShown = false;
        this.rootElement.classList.remove(OPEN_STATE_CLASS_NAME);
    }

    show() {
        this.isShown = true;
        this.rootElement.classList.add(OPEN_STATE_CLASS_NAME);
    }

    toggleAll() {
        if (this.isShown) {
            this.hide();
        } else {
            this.show();
        }
    }
}

export { Menu };