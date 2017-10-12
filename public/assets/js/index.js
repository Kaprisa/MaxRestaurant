import '../sass/pages/index.sass'
import { $ } from './modules/bling'
import slider from './modules/slider'
import popup from './modules/popup'
import './modules/counters'
import './modules/auth'

slider($('.customers-quotes__list'))
popup($('.header__book'), $('.book-popup'))
//popup($('.js-show-user-popup'), $('.user-auth-popup'))
