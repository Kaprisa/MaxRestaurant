import '../sass/pages/checkout.sass'
import calendar from './modules/calendar'
import { $ } from './modules/bling'
import { fadeToggle } from './modules/animate'
import autocomplete from './modules/autocomplete'
import popup from './modules/popup'

popup($('.header__book'), $('.book-popup'))

autocomplete($('#location'))

calendar(document.querySelector('.calendar__holder'))

$('#is-create-account').on('change', () => fadeToggle($('#pass-field')))

$('#show-coupon-form').on('click', (e) => {
	e.preventDefault()
	fadeToggle($('.checkout__coupon-form'))
})