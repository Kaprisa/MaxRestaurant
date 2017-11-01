import '../sass/pages/checkout.sass'
import calendar from './modules/calendar'
import { $ } from './modules/bling'
import { fadeToggle } from './modules/animate'
import autocomplete from './modules/autocomplete'
import popup, { dynamicPopup } from './modules/popup'
import typeAhead from './modules/search'
import axios from 'axios'
import './modules/auth'
import './modules/reservation'

typeAhead($('.search'))
typeAhead($('.blog__side .search'), 'search', '/api/search/article')

popup($('.header__book'), $('.book-popup'))
if ($('.question-show-auth-popup')) popup($('.question-show-auth-popup'), $('.user-auth-popup'))

autocomplete($('#location'))

calendar(document.querySelector('.calendar__holder'))

if ($('#is-create-account')) {
	$('#is-create-account').on('change', () => fadeToggle($('#pass-field')))
}

$('#show-coupon-form').on('click', (e) => {
	e.preventDefault()
	fadeToggle($('.checkout__coupon-form'))
})

$('.checkout__form').on('submit', function(e) {
	e.preventDefault()
	const data = {
			address: this.querySelector('#location').value,
			phone: this.querySelector('#phone').value,
			delivery: true
		}
	axios.post(this.action, data).then(res => {
		const { action, msg } = res.data
		dynamicPopup({ action, msg })
	}).catch(err => {
		console.error(err)
		dynamicPopup({ action: 'error', msg: 'Ошибка оформления заказа :(' })
	})
})