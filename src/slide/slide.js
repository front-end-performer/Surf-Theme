import '../slide/slide.less';


class SlideShowClass {
    constructor(sliderRootElement, intervalTime=2000) {
        if (!(sliderRootElement instanceof HTMLElement)) {
            throw Error('Wrong param provided, sliderRootElement element should be instance of HTMLElement(DOM node)')
        }
        this.touchCoordinates = {
            start: 0,
            end: 0
        };
        this.sliderRootElement = sliderRootElement;
        this.slides = [];
        this.pagerItems = [];
        this.activeSlideIndex = 1;
        this.slidesList = null;
        this.intrevalTime = intervalTime;
        this.init();
    }

    init() {
        this.wrap();
        this.renderControls();
        this.renderPager();
        this.showSlide();
        this.startInterval();
        this.sliderRootElement.addEventListener('mouseenter', () => {
            this.stopInterval();
        });
        this.sliderRootElement.addEventListener('mouseleave', () => {
            this.startInterval();
        });
        this.addTouchEvents();
        this.rootElementWidth = parseFloat(window.getComputedStyle(this.sliderRootElement).width);
    }

    addTouchEvents() {
        this.sliderRootElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.stopInterval();
            this.touchCoordinates.start = e.touches[0].clientX;
        });
        this.sliderRootElement.addEventListener('touchmove', (e) => {
            const dif = this.touchCoordinates.start - e.touches[0].clientX;
            const difAtPercent = dif*(100/this.rootElementWidth);

            console.log(this.rootElementWidth, dif, difAtPercent);
            this.moveSlide(difAtPercent);
        });
        this.sliderRootElement.addEventListener('touchend', (e) => {
            const dif = this.touchCoordinates.start  - e.changedTouches[0].clientX;
            if (dif > 0) {
                this.nextSlide()
            } else {
                this.prevSlide();
            }
            this.startInterval();
        });
    }

    moveSlide(translateAmount) {
        requestAnimationFrame(() => {
            this.slidesList.style.transform = `translate(${translateAmount}%)`;
        });
    }

    showSlide() {
        this.slidesList.style.transform = `translate(-${this.activeSlideIndex * 100}%)`;
    }

    toggleOnPagerItem() {
        this.pagerItems.forEach((item) => item.classList.remove('slideshow__pager-item_active'));
        this.pagerItems[this.activeSlideIndex].classList.add('slideshow__pager-item_active');
    }

    renderPager() {
        const ul = document.createElement('ul');

        ul.classList.add('slideshow__pager');

        for (let i = 0; i < this.slides.length; i++) {
            let pagerItem = document.createElement('li');

            pagerItem.classList.add('slideshow__pager-item');

            if (i === this.activeSlideIndex) {
                pagerItem.classList.add('slideshow__pager-item_active');
            }

            pagerItem.addEventListener('click', () => {
                this.activeSlideIndex = i;
                this.toggleOnPagerItem();
                this.showSlide();
            });
            this.pagerItems.push(pagerItem);
            ul.appendChild(pagerItem);
        }

        this.sliderRootElement.appendChild(ul);
    }

    renderControls() {
        const next = document.createElement('div');
        const prev = document.createElement('div');
        const output = document.createElement('div');

        next.classList.add('slideshow__controls', 'slideshow__controls_next');
        prev.classList.add('slideshow__controls', 'slideshow__controls_prev');
        output.classList.add('slideshow__controls', 'slideshow_output');

        next.innerHTML = '>';
        prev.innerHTML = '<';
        output.innerHTML = '1 / 5';

        next.addEventListener('click', () => {
            debugger;
            this.nextSlide();
        });

        prev.addEventListener('click', () => {
            this.prevSlide();
        });

        this.sliderRootElement.appendChild(prev);
        this.sliderRootElement.appendChild(next);
        this.sliderRootElement.appendChild(output);
    }

    renderSlide(slideContent) {
        const li = document.createElement('li');
        li.classList.add('slideshow__slide');

        li.appendChild(slideContent);
        return li;
    }

    wrap() {
        const viewport = document.createElement('div');
        viewport.classList.add('slideshow__viewport');

        this.slidesList = document.createElement('ul');
        this.slidesList.classList.add('slideshow__slides-list');

        this.slides = Array.from(this.sliderRootElement.children).map((slideContent) => {
            const slide = this.renderSlide(slideContent);
            this.slidesList.appendChild(slide);
            return  slide;
        });

        viewport.append(this.slidesList);

        this.sliderRootElement.appendChild(viewport);
        this.sliderRootElement.classList.add('slideshow');
    }

    nextSlide() {
        if (this.activeSlideIndex < this.slides.length - 1) {
            this.activeSlideIndex++;
        } else {
            this.activeSlideIndex = 0;
        }

        this.toggleOnPagerItem();
        this.showSlide();
    }

    prevSlide() {
        if (this.activeSlideIndex > 0) {
            this.activeSlideIndex--;
        } else {
            this.activeSlideIndex = this.slides.length - 1;
        }
        this.toggleOnPagerItem();
        this.showSlide();
    }

    startInterval() {
        this.stopInterval();
        this.intervalId = window.setInterval(() => {
            this.nextSlide();
        }, this.intrevalTime);
    }

    stopInterval() {
        clearInterval(this.intervalId);
    }
}

export { SlideShowClass };