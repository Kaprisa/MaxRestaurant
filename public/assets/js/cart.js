import '../sass/pages/cart.sass'
import calendar from './modules/calendar'
import popup, { dynamicPopup } from './modules/popup'
import { $, $$ } from './modules/bling'
import typeAhead from './modules/search'
import axios from 'axios'
import './modules/auth'
import './modules/addToCart'
import counter from './modules/counter'
import './modules/reservation'

if ($('.cart__table')) $('.cart__table tbody').querySelectorAll('tr').forEach(item => counter(item.querySelector('.counter'), Number(item.querySelector('.product-price').innerHTML), item.querySelector('.product-total-price')))

typeAhead($('.search'))
typeAhead($('.blog__side .search'), 'search', '/api/search/article')

popup($('.header__book'), $('.book-popup'))

calendar(document.querySelector('.calendar__holder'))

$$('.cart__product-delete').on('click', function() {
	const productLine = this.parentNode.parentNode
	const price = productLine.querySelector('.product-total').innerHTML
	const id = this.getAttribute('data-id')
	axios.delete(`/api/product/${id}/delete`).then( res => {
		productLine.classList.add('slide_up')
		setTimeout(() => {
			product.remove()
			if ($('#total')){
				const total = $('#total').innerHTML
				$('#total').innerHTML = total - price
			}
			if (!$('.cart__table').querySelector('tr')) {
				$('.cart__inner').innerHTML = '<p class="title">Ваша корзина пуста :(</p>'
			}
		}, 2000)
	}).catch( err => { console.error(err) } )
})

if ($('#update-cart')) {
	$('#update-cart').on('click', function() {
		let total = 0
		const newQuantities = $('.cart__table tbody').querySelectorAll('tr').map(item => {
			const count = Number(item.querySelector('#count').value)
			total += count * Number(item.querySelector('.product-price').innerHTML) //добавить $ как before!
			return {
				id: item.querySelector('.cart__product-delete').getAttribute('data-id'),
				count
			}
		})
		axios.post('/api/cart/update', { newQuantities }).then(res => {
			$('#total').innerHTML = total
			dynamicPopup({ msg: 'Ваша корзина успешно обновлена!', action: 'success'})
		}).catch(err => {
			console.error(err)
			dynamicPopup({ msg: 'Не удалось обновить вашу корзину :(', action: 'error'})
		})
	})
}