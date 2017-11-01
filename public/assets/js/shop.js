import '../sass/pages/shop.sass'
import { $ } from './modules/bling'
import  dropdown from './modules/dropdown'
import  range from './modules/range'
import popup from './modules/popup'
import { changePage, sort } from './modules/changePage'
import typeAhead from './modules/search'
import './modules/auth'
import './modules/addToCart'
import './modules/reservation'

typeAhead($('.search'))

changePage('pagination')
changePage('shop-categories')
sort()

popup($('.header__book'), $('.book-popup'))

dropdown($('.js-dropdown'))
range('price-range')