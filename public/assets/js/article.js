import '../sass/pages/article.sass'
import calendar from './modules/calendar'
import { $ } from './modules/bling'
import popup from './modules/popup'

popup($('.header__book'), $('.book-popup'))

calendar(document.querySelector('.calendar__holder'))