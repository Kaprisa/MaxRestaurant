import '../sass/pages/blog.sass'
import calendar from './modules/calendar'
import { $ } from './modules/bling'
import popup from './modules/popup'
import { changePage, sort } from './modules/changePage'
import typeAhead from './modules/search'
import './modules/auth'
import './modules/reservation'

typeAhead($('.search'))

changePage('pagination')
changePage('blog-categories')
changePage('tags')
typeAhead($('.blog__side .search'), 'search', '/api/search/article')

popup($('.header__book'), $('.book-popup'))

calendar(document.querySelector('.calendar__holder'))