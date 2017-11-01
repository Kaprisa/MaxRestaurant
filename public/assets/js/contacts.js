import '../sass/pages/contacts.sass'
import './modules/map-init'
import { $ } from './modules/bling'
import popup from './modules/popup'
import typeAhead from './modules/search'
import './modules/auth'
import './modules/reservation'

typeAhead($('.search'))

popup($('.header__book'), $('.book-popup'))