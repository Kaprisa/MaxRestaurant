const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const arrows = '<div class="calendar__arrows arrows"><span class="arrows_left"> </span><span class="arrows_right"> </span></div>'
const currentDate = new Date()
const currentDay = currentDate.getDate()
const currentMonth = currentDate.getMonth()
import { fadeOut } from './animate'

function getDaysOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function calendarBuilder(calendar, date = currentDate) {
	let monthNum = date.getMonth()
	const month = months[monthNum]
	let year = date.getFullYear()
	const daysLength = getDaysOfMonth(date)
	const rows = Math.ceil(daysLength / 7)
	let table = '<span class="btn_close-calendar"></span><table class="calendar__table"><thead><tr class="calendar__row">'
	days.forEach(item => {
		table += `<th class="calendar__col calendar__col_head">${item}</th>`
	})
	table += '</tr></thead><tbody>'
	for (let i = 0; i < rows; ++i) {
		table += '<tr class="calendar__row">'
			for (let j = 7 * i + 1 ; j < 7 * i + 8 ; j ++) {
				table += `<td class="calendar__col ${/*i === currentMonth && */j === currentDay ? 'calendar__col_current' : ''}">${j}</td>`
			}
		table += '</tr>'
	}
	table += '</tbody></table>'
	let calendarStr = `${arrows}<span class="calendar__day">${month} ${currentDay}, ${year}</span>${table}`
	calendar.innerHTML = calendarStr
	calendar.querySelector('.arrows_left').addEventListener('click', function() {
		if (monthNum === 1) {
			monthNum = 13
			year = year - 1
		}
		calendarBuilder(calendar, new Date(year, monthNum - 1, 1))
	})
	calendar.querySelector('.arrows_right').addEventListener('click', function() {
		if (monthNum === 12) {
			monthNum = 0
			year = year + 1
		}
		calendarBuilder(calendar, new Date(year, monthNum + 1, 1))
	})
	calendar.querySelectorAll('.calendar__col').forEach(item => {
		item.addEventListener('click', function() {
			const selected = calendar.querySelector('.calendar__col_selected')
			if (selected) {
				selected.classList.remove('calendar__col_selected')
			}
			this.classList.add('calendar__col_selected')
			const input = calendar.parentElement.querySelector('input')
			input.value = `${this.innerHTML}.${monthNum / 10 >= 1 ? monthNum : `0${monthNum}`}.${year}`
			input.setAttribute('data-date', new Date(year, monthNum, this.innerHTML))
		})
	})
	calendar.querySelector('.btn_close-calendar').addEventListener('click', function() {
		fadeOut(calendar)
	})
}

export default calendarBuilder