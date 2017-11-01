const sql = require('mssql')

exports.getHome = (req, res) => {
	res.render('index', { name: 'index' })
}

exports.getAbout = (req, res) => {
	res.render('about', { name: 'about' })
}

exports.getContacts = (req, res) => {
	res.render('contacts', { name: 'contacts' })
}

exports.getGallery = (req, res) => {
	res.render('gallery', { name: 'gallery' })
}

exports.getReservation = (req, res) => {
	res.render('reservation', { name: 'reservation' })
}

