import '../sass/pages/admin.sass'
import tabPages from './modules/tabPages'
import { $, $$ } from './modules/bling'
import addItemsToBox from './modules/addItemsToBox'
import { fadeOut } from './modules/animate'
import popup, { dynamicPopup } from './modules/popup'
import axios from 'axios'
import { numValidator } from './modules/inputValidator'
import { postDataWithPhoto } from './modules/postDataWithPhoto'
import autocomplete from './modules/autocomplete'
import typeAhead from './modules/search'

typeAhead($('.search'))

tabPages('tabs', loadPage)

window.onload = function() {
  loadPage()
}

function loadPage() {
	const page = location.href.split('/')[4]
	switch (page) {
		case 'menu':
			menu()
			break
		case 'shop':
			shop()
			break
		case 'blog':
			blog()
			break
		case 'events':
			evts()
			break
		case 'lists':
			lists()
			break
	}
}

const common = () => {

	$$(`.toggle-items__item`).on('click', function() {
		fadeOut(this, () => this.remove())
	})

	if ($('#photo')) {
		$('#photo').on('change', function(e) {
			this.previousElementSibling.innerHTML = this.files[0].name
		})
	}

	if ($('#remove')) {
		$('#remove').on('click', function() {
			axios.delete(this.getAttribute('data-action')).then(res => {
				dynamicPopup({ action: 'success', msg: 'Данные успешно удалены!' })
			}).catch(err => {
				dynamicPopup({ action: 'error', msg: 'Ошибка удаления :(' })
				console.error(err)
			})
		})
	}
}

const menu = () => {

	common()//Здесь т к в листе нет ничего из общего

	$$('.js-number').forEach(item => numValidator(item))

	popup($('#show-category-popup'), $('.categories-popup'))

	$('#ingridient').on('keydown', function(e) {
		if (e.keyCode === 13) {
			e.preventDefault()
			addItemsToBox(this, 'toggle-items')
		}
	})

	$('#add-category').on('click', function() {
		const category = $('#newCategory').value
		axios.post('/menu/categories/add', { category, shortDescription: $('#shortDescription').value }).then(res => {
			dynamicPopup({ action: 'success', msg: 'Данные успешно загружены!' })
			const option = document.createElement('option')
			if (!$('#category').querySelectorAll('option').some(item => item.innerHTML === category)) {
				option.className = 'option'
				option.innerHTML = 	category
				$('#category').appendChild(option)
			}
			$('#newCategory').value = ''
			$('#shortDescription').value = ''
			fadeOut($('.categories-popup'))
		}).catch(err => {
			dynamicPopup({ action: 'error', msg: 'Ошибка загрузки данных :(' })
			console.error(err)
		})
	})

	$('.menu-editor__form').on('submit', function(e) {
		e.preventDefault()
		const ingridients = $('#ingridient').parentElement.querySelectorAll('.toggle-items__item').map(item => item.innerHTML).join(',')
		const data = {
			name: $('#productName').value,
			category: $('#category').value,
			price: $('#price').value,
			size: $('#size').value,
			calories: $('#calories').value,
			photo: $('#photo').getAttribute('data-value'), //На случай обновления
			ingridients
		}
		postDataWithPhoto(data, this.action, 84)
	})
}



const shop = () => {

	common()

	$$('.js-number').forEach(item => numValidator(item))

	if ($('.products-popup')) {
		popup($('#show-products-popup'), $('.products-popup'))
		$('.products-popup__form').on('submit', function(e) {
			e.preventDefault()
			const data = {
				size: $('#size').value,
				color: $('#color').value,
				quantity: $('#quantity').value,
				photo: $('#photo').getAttribute('data-value'), //На случай обновления
			}
			postDataWithPhoto(data, this.action, 300)
		})
	} 

	$('.shop-editor__form').on('submit', function(e) {
		e.preventDefault()
		const data = {
			name: $('#productName').value,
			type: $('#type').value,
			category: $('#category').value,
			price: $('#price').value,
			desc: $('#desc').value
		}
		axios.post(this.action, data).then(res => {
			dynamicPopup({ action: 'success', msg: 'Данные успешно загружены!' })
		}).catch(err => {
			dynamicPopup({ action: 'error', msg: 'Ошибка загрузки данных :(' })
			console.error(err)
		})
	})
	
}


const blog = () => {

	common()

	$$('#categories, #tags').on('keydown', function(e) {
		if (e.keyCode === 13) {
			e.preventDefault()
			addItemsToBox(this, 'toggle-items')
		}
	})

	$('.blog-editor__form').on('submit', function(e) {
		e.preventDefault()
		const categories = $('#categories').parentElement.querySelectorAll('.toggle-items__item').map(item => item.innerHTML).join(',')
		const tags = $('#tags').parentElement.querySelectorAll('.toggle-items__item').map(item => item.innerHTML).join(',')
		const data = {
			name: $('#articleName').value,
			quote: $('#quote').value,
			desc: $('#desc').value,
			categories,
			tags,
			photo: $('#photo').getAttribute('data-value'), //На случай обновления
		}
		postDataWithPhoto(data, this.action, 850)
	})

}

const evts = () => {

	common()

	autocomplete($('#location'))

	$('#categories').on('keydown', function(e) {
		if (e.keyCode === 13) {
			e.preventDefault()
			addItemsToBox(this, 'toggle-items')
		}
	})

	$('.events-editor__form').on('submit', function(e) {
		e.preventDefault()
		const categories = $('#categories').parentElement.querySelectorAll('.toggle-items__item').map(item => item.innerHTML).join(',')
		const data = {
			name: $('#eventName').value,
			desc: $('#desc').value,
			subject: $('#subject').value,
			time: $('#time').value,
			location: $('#location').value,
			categories,
			photo: $('#photo').getAttribute('data-value'), //На случай обновления
		}
		postDataWithPhoto(data, this.action, 360)
	})
}

const lists = () => {
	$$('.admin-lists__icon_delete').on('click', function() {
		axios.delete(this.getAttribute('data-action')).then(res => {
			dynamicPopup({ action: 'success', msg: 'Данные успешно удалены!' })
			const item = this.parentElement.parentElement
			fadeOut(item, () => item.remove())
		}).catch(err => {
			dynamicPopup({ action: 'error', msg: 'Ошибка удаления :(' })
			console.error(err)
		})
	})
}

