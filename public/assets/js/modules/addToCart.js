import axios from 'axios'
import { $$, $ } from './bling'
import { dynamicPopup, showPopup } from './popup'

function addToCard(){
	$$('.add-to-cart').on('click', function(e) {
		e && e.preventDefault && e.preventDefault()
		const id = this.getAttribute('data-id')		
		axios.post(`/api/product/${id}/addToCart`, { count: ( $('#count') ? $('#count').value : 1 ) }).then(res => {
			if (res.data.action && res.data.action === 'error') {
				dynamicPopup({ action: 'error', msg: res.data.msg })
				showPopup($('.user-auth-popup'))
				return
			}
			if ($('.shop-cart__price')) $('.shop-cart__price').innerHTML = res.data.price
			dynamicPopup({ action: 'success', msg: 'Товар успешно добавлен в вашу корзину!'})
		}).catch(err => {
			console.error(err)
			dynamicPopup({ action: 'error', msg: 'Ошибка добавления товара :(' })
		})
	})
}

export default addToCard()