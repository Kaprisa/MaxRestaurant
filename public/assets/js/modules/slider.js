let left = 0
let count

function move(elem, helper, nav, navItems) {
	elem.style.left = `-${left}%`
	nav.querySelector('.circle-nav__item_active').classList.remove('circle-nav__item_active')
	navItems[ left < count * 100 ? left / 100 : 0 ].classList.add('circle-nav__item_active')
	if (left === (count - 1) * 100) {
		setTimeout(() => {
			helper.style.cssText += 'visibility: visible; left: 0'
			elem.style.left = `-${left+100}%`
			setTimeout(() => {
				elem.style.cssText = 'visibility: hidden; left: 0'
				setTimeout(() => {
					left = 100
					elem.style.visibility = "visible"
					helper.style.cssText += "visibility: hidden; left: 100%"
					move(elem, helper, nav, navItems)
				}, 1500)
			}, 5000)
		}, 5000)
	} else {
		setTimeout(() => { 
			left += 100
		  move(elem, helper, nav, navItems) 
		}, 5000)
	}
}

function slider(elem, c = 4) {
	count = c
	const nav = elem.parentElement.nextElementSibling
	const navItems = nav.querySelectorAll('li')
	navItems[0].classList.add('circle-nav__item_active')
	/*navItems.forEach(item => {
		item.addEventListener('click', function() {
			left = navItems.indexOf(this) * 100
			elem.style.left = `-${left}%`
			nav.querySelector('.circle-nav__item_active').classList.remove('circle-nav__item_active')
			this.classList.add('circle-nav__item_active')
		})
	})*/
	const helper = document.createElement('div')
	helper.innerHTML = elem.querySelector('li').innerHTML
	helper.classList = elem.querySelector('li').classList
	helper.style.cssText = 'transition: left 1.5s linear; position: absolute; top: 0; left: 100%; z-index: 100'
	elem.parentElement.append(helper)
	setInterval(move(elem, helper, nav, navItems), 2000)
}

export default slider
