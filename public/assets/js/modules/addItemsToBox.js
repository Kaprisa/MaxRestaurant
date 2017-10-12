import { $ } from './bling'
import { fadeOut } from './animate'

export default (input, parentClass) => {
	const item = input.value
	if (!item) return
	input.value = ''
	const span = document.createElement('span')
	span.className = `${parentClass}__item` 
	span.innerHTML = item
	input.nextElementSibling.appendChild(span)
	span.addEventListener('click', function() {
		fadeOut(this, () => span.remove())
	})
}