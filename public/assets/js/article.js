import '../sass/pages/article.sass'
import calendar from './modules/calendar'
import { $ } from './modules/bling'
import popup from './modules/popup'
import typeAhead from './modules/search'
import './modules/auth'
import './modules/reservation'

typeAhead($('.search'))
typeAhead($('.blog__side .search'), 'search', '/api/search/article')

popup($('.header__book'), $('.book-popup'))

calendar(document.querySelector('.calendar__holder'))