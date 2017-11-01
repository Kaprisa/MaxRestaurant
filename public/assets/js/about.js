import '../sass/pages/about.sass'
import { $ } from './modules/bling'
import slider from './modules/slider'
import './modules/counters'
import popup from './modules/popup'
import typeAhead from './modules/search'
import './modules/auth'
import './modules/reservation'

typeAhead($('.search'))

popup($('.header__book'), $('.book-popup'))

slider($('.customers-quotes__list'))