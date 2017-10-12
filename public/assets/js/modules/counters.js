import { $, $$ } from './bling'

let count = 0
let intervalID

const counters = $$('.counters__count').map(counter => {
	return {
		elem: counter,
		max: Number(counter.innerHTML)
	}
})

const updateCounters = () => {
	if (!counters.length) clearInterval(intervalID)
	counters.forEach((counter, index) => {
		if (count === counter.max) delete counters[index]
		else counter.elem.innerHTML = count
	})
	count++
}

const countersSection = $('.counters');
const topBorder = countersSection.offsetTop - screen.height / 3;
const bottomBorder = countersSection.offsetTop + countersSection.offsetHeight - screen.height / 3;

const scrollListener = () => {
	if (window.scrollY > topBorder) {
		intervalID = setInterval(updateCounters, 3)
		window.removeEventListener( 'scroll', scrollListener)
	}
}

window.addEventListener( 'scroll', scrollListener)
