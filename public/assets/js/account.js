import '../sass/pages/account.sass'
import calendar from './modules/calendar'
import { $, $$ } from './modules/bling'
import axios from 'axios'
import popup, { dynamicPopup } from './modules/popup'
import './modules/money'
import tabPages from './modules/tabPages'
import autocomplete from './modules/autocomplete'

popup($('.header__book'), $('.book-popup'))

calendar(document.querySelector('.calendar__holder'))

tabPages('tabs', loadPage)

if ($('.show-order-details-popup')) {
 popup($('.show-order-details-popup'), $('.order-details-popup'))
}

window.onload = function() {
  loadPage()
}

function loadPage() {
	const { href } = location
	const page = href.substring(href.lastIndexOf('/') + 1, href.length)
	switch (page) {
		case 'contacts': {
			contacts()
			break
		}
		case 'purse': {
			purse()
			break
		}
		case 'orders': {
			orders()
			break
		}
		case 'bonus': {
			bonus()
			break
		}
	}
}

const contacts = () => {

	autocomplete($('#location'))

	$('#profile').on('submit', function(e) {
		e.preventDefault()
		const data = {
			name: $('#name').value,
			lastName: $('#surname').value,
			phone: $('#phone').value,
			address: $('#address').value
		}
		axios.post(this.action, data).then(res => {
			this.reset()
			dynamicPopup({ action: 'success', msg: 'Ваш профиль успешно обновлён!' })
		}).catch( err => {
			dynamicPopup({ action: 'error', msg: 'Ошибка обновления профиля...!' })
			console.error(err)
		})
	})

	$('#change-password').on('submit', function(e) {
		e.preventDefault()
		const data = {
			oldPassword: $('#oldPassword').value,
			password: $('#password').value,
			confirmPassword: $('#confirmPassword').value
		}
		axios.post(this.action, data).then(res => {
			this.reset()
			dynamicPopup({ action: 'success', msg: res.data })
		}).catch(err => {
			dynamicPopup({ action: 'error', msg: 'Ошибка обновления пароля...!' })
			console.error(err)
		})
	})
	
}

const purse = () => {
	const moneyPopup = $('.money-popup')
	popup($('.js-showMoneyPopup'), moneyPopup)
	moneyPopup.querySelector('.money').innerHTML = $('.js-m').innerHTML
}

const orders = () => {}
const bonus = () => {}