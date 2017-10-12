import '../sass/pages/shop.sass'
import { $ } from './modules/bling'
import  dropdown from './modules/dropdown'
import  range from './modules/range'
import popup from './modules/popup'

popup($('.header__book'), $('.book-popup'))

dropdown($('.js-dropdown'))
range('price-range')