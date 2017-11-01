import axios from 'axios'
import { hidePopup, dynamicPopup } from './popup'
import { fadeOut, fadeIn } from './animate'
import { $, $$ } from './bling'

const deleteComment = (elem) => {
	axios.delete(`/review/${elem.getAttribute('data-id')}`).then(res=> {
		const comment = elem.parentElement.parentElement
		fadeOut(comment, () => comment.remove())
		const count = Number($('#reviews-count').innerHTML)
		$('#reviews-count').innerHTML =  count > 0 ? count - 1 : 0
		dynamicPopup({ action: 'success', msg: 'Ваш отзыв успешно удален!' })
	}).catch(err => {
		dynamicPopup({ action: 'error', msg: 'Не удалось удалить ваш отзыв :(' })
	})
}

export default (() => {

	const popup = $('.reviews-popup')

	popup.querySelectorAll('.star').on('click', function() {
		const active = popup.querySelector('.star_active')
		if (active) {
			active.classList.remove('star_active')
		}
		this.classList.add('star_active')
	})

	$('#review-form').on('submit', function(e) {
		e.preventDefault()
		const data = {
			text: popup.querySelector('.textarea').value,
			rating: popup.querySelector('.star_active') ? popup.querySelector('.star_active').getAttribute('data-star') : 0
		}
		axios.post(this.action, data).then(res=> {
			this.reset()
			const comment = document.createElement('div')
			comment.className = 'fade-in'
			comment.innerHTML = res.data
			$('.comments').appendChild(comment)
			comment.querySelector('.comments__delete-icon').on('click', function() { deleteComment(this) })
			const count = Number($('#reviews-count').innerHTML)
			$('#reviews-count').innerHTML = count + 1
			dynamicPopup({ action: 'success', msg: 'Спасибо за отзыв!' })
			hidePopup(popup)
		}).catch(err => {
			dynamicPopup({ action: 'error', msg: 'Не удалось сохранить ваш отзыв :(' })
		})
	})


	$$('.comments__delete-icon').on('click', function() { deleteComment(this) })
	/*if ($('#btn-more')) {
		$('.product-about__reviews').querySelector('#btn-more').on('click', function() {
			axios.get(`/reviews/more?id=${productID}`).then(res => {
				$('.reviews__holder').innerHTML += res.data
			}).catch((err) => console.error(err))
		})
	}*/
})()
