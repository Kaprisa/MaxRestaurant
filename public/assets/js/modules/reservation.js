import axios from 'axios'
import { $$ } from './bling'
import { dynamicPopup } from './popup'

export default (() => {
		$$('.reservation-form').on('submit', function(e) {
			e.preventDefault()
			const data = {
				name: this.querySelector('#name').value,
				email: this.querySelector('#email').value,
				phone: this.querySelector('#phone').value,
				subject: this.querySelector('#subject').value,
				table: this.querySelector('#table').value,
				time: this.querySelector('#time').value,
				msg: this.querySelector('#msg').value
			}
			axios.post(this.action, data).then(res => {
				dynamicPopup({ action: 'success', msg: 'Ваше бронирование прошло успешно!'})
			}).catch(err => {
				console.error(err)
				dynamicPopup({ action: 'error', msg: 'Не удалось оформить бронирование :(' })
			})
		})
})()