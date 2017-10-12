import '../sass/pages/admin.sass'
import tabPages from './modules/tabPages'
import { $, $$ } from './modules/bling'
import addItemsToBox from './modules/addItemsToBox'
import { fadeOut } from './modules/animate'
import popup from './modules/popup'
import { numValidator } from './modules/inputValidator'
import autocomplete from './modules/autocomplete'

tabPages('tabs', loadPage)

window.onload = function() {
  loadPage()
}

function loadPage() {
	const { href } = location
	const page = href.substring(href.lastIndexOf('/') + 1, href.length)
	common()
	switch (page) {
		case 'menu': {
			menu()
			break
		}
		case 'shop': {
			shop()
			break
		}
		case 'blog': {
			blog()
			break
		}
		case 'events': {
			evts()
			break
		}
	}
}

const common = () => {
	$$(`.toggle-items__item`).on('click', function() {
		fadeOut(this, () => this.remove())
	})
	$('#photo').on('change', function(e) {
		this.previousElementSibling.innerHTML = this.files[0].name
	})
}

const menu = () => {

	$$('.js-number').forEach(item => numValidator(item))

	popup($('#show-category-popup'), $('.categories-popup'))

	$('#ingridient').on('keydown', function(e) {
		if (e.keyCode === 13) {
			e.preventDefault()
			addItemsToBox(this, 'toggle-items')
		}
	})
}



const shop = () => {
	$$('.js-number').forEach(item => numValidator(item))
	popup($('#show-products-popup'), $('.products-popup'))
}
const blog = () => {
	$$('#categories, #tags').on('keydown', function(e) {
		if (e.keyCode === 13) {
			e.preventDefault()
			addItemsToBox(this, 'toggle-items')
		}
	})
}
const evts = () => {

	autocomplete($('#location'))

	$('#categories').on('keydown', function(e) {
		if (e.keyCode === 13) {
			e.preventDefault()
			addItemsToBox(this, 'toggle-items')
		}
	})
}

