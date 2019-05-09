import { Menu } from "./menu_mobile/menu_mobile";
import { SlideShowClass } from "./slide/slide";

import "./styles.less";

const menuMobile = new Menu('.menu_trigger-mobile');

const firstSliderElement = document.querySelector('.slider_title');
const mySlideShow2 = new SlideShowClass(firstSliderElement, 4000);













