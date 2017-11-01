import '../sass/pages/product.sass'
import { $ } from './modules/bling'
import tabs from './modules/tabs'
import popup from './modules/popup'
import './modules/review'
import counter from './modules/counter'
import './modules/heart'
import typeAhead from './modules/search'
import './modules/auth'
import './modules/addToCart'
import './modules/reservation'

typeAhead($('.search'))

popup($('.header__book'), $('.book-popup'))
counter($('.counter'))

tabs('tabs')
popup($('.btn-show-reviews-popup'), $('.reviews-popup'))
