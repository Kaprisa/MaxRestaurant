import '../sass/pages/product.sass'
import { $ } from './modules/bling'
import tabs from './modules/tabs'
import popup from './modules/popup'

popup($('.header__book'), $('.book-popup'))

tabs('tabs')
popup($('.btn-show-reviews-popup'), $('.reviews-popup'))