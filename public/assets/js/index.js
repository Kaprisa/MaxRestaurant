import '../sass/pages/index.sass'
import { $ } from './modules/bling'
import slider from './modules/slider'
import popup from './modules/popup'
import './modules/counters'
import './modules/auth'
import './modules/reservation'
import typeAhead from './modules/search'

typeAhead($('.search'))

slider($('.customers-quotes__list'))
popup($('.header__book'), $('.book-popup'))
//popup($('.js-show-user-popup'), $('.user-auth-popup'))
