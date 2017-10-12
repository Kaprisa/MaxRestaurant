import '../sass/pages/cart.sass'
import calendar from './modules/calendar'
import popup from './modules/popup'
import { $ } from './modules/bling'

popup($('.header__book'), $('.book-popup'))

calendar(document.querySelector('.calendar__holder'))