const sql = require('mssql')

exports.getHome = async (req, res) => {
	res.render('index', { name: 'index' })
}