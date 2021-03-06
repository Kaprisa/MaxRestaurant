import { $$, $ } from './bling'
import axios from 'axios'

function changePageReq(navParentClass, page = 1, sort = 'ID', hst = true) {
	axios.get(`${page}?axs=1&sort=${sort}`).then(res => {
		if (!res.data) return
		$('#catalog-holder').innerHTML = res.data
		const state = { page: page, sort: sort }
		if (hst){
			history.pushState(state, 'Айфонсервис', state.page)
		}
		changePage(navParentClass)
	})
}

function changePage(navParentClass) {
	if (!$(`.${navParentClass}`)) return
		$$(`.${navParentClass}__link`).on('click', function(e){
			e.preventDefault()
			const sort = $('.sort__current') ? $('.sort__current').getAttribute('data-sort') : 'ID'
			const href = this.getAttribute('href')
			changePageReq(navParentClass, href, sort)
		})
	window.onpopstate = function(e) {
  	if (!e.state) return
  	changePageReq(navParentClass, e.state.page, e.state.sort, false)
	}
}

function sort(){
	const items = $$('.js-sort-item')
	items.on('click', function() {
		const page = location.href.substring(location.href.indexOf('/', location.href.length - 1))
		changePageReq('pagination', page, this.getAttribute('data-sort'))
	})	
}

export { changePage, sort }