import '../sass/pages/about.sass'
import { $ } from './modules/bling'
import slider from './modules/slider'
import './modules/counters'
import popup from './modules/popup'

popup($('.header__book'), $('.book-popup'))

slider($('.customers-quotes__list'))