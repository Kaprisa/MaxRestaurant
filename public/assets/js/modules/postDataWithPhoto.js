import { $ } from './bling'
import axios from 'axios'
import { dynamicPopup } from './popup'

function uploadPhoto(photo, size, cb){
	if (!photo) return cb(null)
	const config = {
	  headers: { 'content-type': 'multipart/form-data' }
	}
	const formData = new FormData()
	formData.append('photo', photo)
	formData.append('size', size)
	axios.post('/api/fileUpload', formData, config)
	  .then( res =>  {
	  	cb(res.data)
	  }).catch(err => {
	  	console.error(err) 
	  	return
	  })
}

export const postDataWithPhoto = (data, action, size = 500) => {
	uploadPhoto($('#photo').files[0], size, function(photo) {
		if (photo !== null) data.photo = photo
		axios.post(action, data).then(res => {
			dynamicPopup({ action: 'success', msg: 'Данные успешно загружены!' })
		}).catch(err => {
			dynamicPopup({ action: 'error', msg: 'Ошибка загрузки данных :(' })
			console.error(err)
		})
	})
}