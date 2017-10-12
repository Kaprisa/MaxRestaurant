import { $ } from './bling'

export default (rangeClassName) => {
	const range = $(`.${rangeClassName}__range`)
	const { width: rangeLength, right: rangeRight } = range.getBoundingClientRect()
	const firstControl = range.querySelector('#first-control')
	const lastControl = range.querySelector('#last-control')
	const min = $('#min-price')
	const max = $('#max-price')
	const minPrice = Number(min.innerHTML)
	const maxPrice = Number(max.innerHTML)

	const priceRange = maxPrice - minPrice

	const rangePercentLength = rangeLength / 100

	let [ firstMoving, lastMoving ] = [ false, false ]

	firstControl.on('mousedown', () => firstMoving = true)
	lastControl.on('mousedown', () => lastMoving = true)
	firstControl.on('mouseup', () => firstMoving = false)
	lastControl.on('mouseup', () => lastMoving = false)
	window.range = range

	range.on('mousemove', function(e) {
		if (!firstMoving && !lastMoving) return
		const cur = rangeLength - (rangeRight - e.pageX)
		const position = cur / rangePercentLength
		if (position < 0 || position > 100) return
		if (firstMoving) {
			if ((lastControl.offsetLeft - firstControl.clientWidth) < cur) return
			firstControl.style.left = `${position}%`
			min.innerHTML = minPrice + Math.round(priceRange * (position / 100))
		} else if (lastMoving) {
			if ((firstControl.offsetLeft + firstControl.clientWidth) > cur) return
			lastControl.style.left = `${position}%`
			max.innerHTML = minPrice + Math.round(priceRange * (position / 100))
		}
	})
}