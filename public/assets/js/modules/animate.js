function fadeIn(elem, cb = null) {
	elem.classList.add('fade-in')
	elem.style.display = 'block'
	setTimeout(() => {
		elem.classList.remove('fade-in')
		if ( cb instanceof Function) {
			cb()
		}
	}, 1000)
}

function fadeOut(elem, cb = null) {
	elem.classList.add('fade-out')
	setTimeout(() => {
		elem.style.display = 'none'
		elem.classList.remove('fade-out')
		if ( cb instanceof Function) {
			cb()
		}
	}, 1000)
}

function fadeToggle(elem) {
	if (elem.style.display === 'none') {
		fadeIn(elem)
	} else {
		fadeOut(elem)
	}
}

function animate(elem, animateClass, duration,  cb = null) {
	elem.classList.add(animateClass)
  setTimeout(() => {
    elem.classList.remove(animateClass)
    if ( cb instanceof Function) {
			cb()
		}
  }, duration)
}

export { fadeIn, fadeOut, fadeToggle, animate }