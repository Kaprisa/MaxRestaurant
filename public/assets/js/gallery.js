import '../sass/pages/gallery.sass'
import { $$, $ } from './modules/bling'
import popup from './modules/popup'
import typeAhead from './modules/search'
import './modules/auth'
import './modules/reservation'

typeAhead($('.search'))

popup($('.header__book'), $('.book-popup'))

const photos = $$('.gallery__item')
const galleryPopup = $('.gallery-popup')

$$('.gallery-categories__item').on('click', function() {
	$('.gallery-categories__item_active').classList.remove('gallery-categories__item_active')
	const category = this.getAttribute('data-category')
	this.classList.add('gallery-categories__item_active')
	photos.forEach(photo => photo.style.display = category === 'all' || photo.getAttribute('data-categories').includes(category) ? 'block' : 'none')
})

photos.forEach(photo => popup(photo, galleryPopup, photo.querySelector('img').outerHTML))

$$('.arrows__left, .arrows__right').on('click', function() {
	const current = $('.gallery__photos').querySelector(`img[src="${$('.gallery-popup img').getAttribute('src')}"]`).parentElement
	let index = photos.indexOf(current)
	index = this.className.includes('left') ? (index === 0 ? photos.length - 1 : index - 1) : (index === photos.length - 1 ? 0 : index + 1)
	galleryPopup.querySelector('.popup__content').innerHTML = photos[index].querySelector('img').outerHTML
})