import axios from 'axios'
import { $ } from './bling'
import { dynamicPopup, showPopup } from './popup'

function like(){
	const likesCountHolder = $('.product-likes__count')
	let likesCount = Number(likesCountHolder.innerHTML)
	let liked = $('.product-likes__icon').classList.value.includes('liked')
	$('#like').on('click', function() {
		this.classList.toggle('product-likes__icon_liked')
		likesCountHolder.innerHTML = liked ? likesCount : likesCount + 1
		axios.post(this.getAttribute('data-action')).then(res=> {
			if (res.data.action && res.data.action === 'error') {
				dynamicPopup({ action: 'error', msg: res.data.msg })
				showPopup($('.user-auth-popup'))
				this.classList.remove('product-likes__icon_liked')
				likesCountHolder.innerHTML = likesCount
				return
			}
			liked = !liked
		}).catch(console.error)
	})
}

export default like()