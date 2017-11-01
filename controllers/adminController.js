const sql = require('mssql')

exports.getTabs = (req, res) => {
	const { page = 'menu' } = req.params
	if (req.query.axs) {
		return res.render(`admin-tabs/${page}`, { page }, (err, html) => {
			if (err) {
				console.error(err)
				throw Error(err)
			}
			res.send(html)
		})
	}
	res.render('admin', { name: 'admin', page })
}

exports.getMenu = async (req, res) => {
	const { recordset: categories } = await new sql.Request().query('SELECT Name FROM MenuCategories')
	if (req.query.axs) {
		return res.render(`admin-tabs/menu`, { page: 'menu', categories }, (err, html) => {
			if (err) {
				console.error(err)
				throw Error(err)
			}
			res.send(html)
		})
	}
	res.render('admin', { name: 'admin', page: 'menu', categories })
}

exports.getEditProduct = async (req, res) => {
	const query =
		` SELECT M.ID, M.Name, M.Price, M.Description, C.Name AS Category, T.Name AS Type FROM ProductModels M
			JOIN ProductCategories C
			ON C.ID = M.CategoryID
			JOIN ProductTypes T
			ON T.ID = C.TypeID
			WHERE M.ID = ${req.params.id}
		`
	const { recordset: [ productModel ] } = await new sql.Request().query(query)
	if (req.query.axs) {
		return res.render(`admin-tabs/shop`, { page: 'shop', productModel }, (err, html) => {
			if (err) {
				console.error(err)
				throw Error(err)
			}
			res.send(html)
		})
	}
	res.render('admin', { name: 'admin', page: 'shop', productModel })
}

exports.getEditArticle = async (req, res) => {
	const query =
		` SELECT * FROM Articles
			WHERE ID = ${req.params.id}
		`
	const { recordset: [ article ] } = await new sql.Request().query(query)
	if (req.query.axs) {
		return res.render(`admin-tabs/blog`, { page: 'blog', article }, (err, html) => {
			if (err) {
				console.error(err)
				throw Error(err)
			}
			res.send(html)
		})
	}
	res.render('admin', { name: 'admin', page: 'blog', article })
}

exports.getEditEvent = async (req, res) => {
	const query =
		` SELECT * FROM RestaurantEvents
			WHERE ID = ${req.params.id}
		`
	const { recordset: [ event ] } = await new sql.Request().query(query)
	if (req.query.axs) {
		return res.render(`admin-tabs/events`, { page: 'events', event }, (err, html) => {
			if (err) {
				console.error(err)
				throw Error(err)
			}
			res.send(html)
		})
	}
	res.render('admin', { name: 'admin', page: 'events', event })
}

exports.getEditDish = async (req, res) => {
	const query =
		` SELECT D.ID, D.Name, D.Photo, D.Price, D.PortionSize, D.Calories, C.Name AS Category FROM MenuDishes D
			JOIN MenuCategories C ON C.ID = D.CategoryID
			WHERE D.ID = ${req.params.id}
		`
	const { recordset: [ dish ] } = await new sql.Request().query(query)
	if (req.query.axs) {
		return res.render(`admin-tabs/menu`, { page: 'menu', dish }, (err, html) => {
			if (err) {
				console.error(err)
				throw Error(err)
			}
			res.send(html)
		})
	}
	res.render('admin', { name: 'admin', page: 'menu', dish })
}

exports.getLists = async (req, res) => {
	const { list: l = 'menu' } = req.params
	let [ table, title ] = [ 'MenuDishes', 'Меню' ]
	switch (l) {
		case 'menu':
			[ table, title ] = [ 'MenuDishes', 'Меню' ]
			break
		case 'shop':
			[ table, title ] = [ 'ProductsListView', 'Магазин' ] //TODO Ссылка рабоает неправильно! Ссылается на продукт, а в редакторе только модель
			break
		case 'events':
			[ table, title ] = [ 'RestaurantEvents', 'События' ]
			break
		case 'blog':
			[ table, title ] = [ 'Articles', 'Блог' ]
			break
		default:
			break
	}
	const { recordset: list } = await new sql.Request().query(`SELECT ID, Name FROM ${table}`)
	if (req.query.axs) {
		return res.render(`admin-tabs/lists`, { page: 'lists', list, title, l }, (err, html) => {
			if (err) {
				console.error(err)
				throw Error(err)
			}
			res.send(html)
		})
	}
	res.render('admin', { name: 'admin', page: 'lists', list, title, l })
}

exports.remove =  async (req, res, next) => {
	const { id, l } = req.params
	let table
	switch (l) {
		case 'menu':
			table = 'MenuDishes'
			break
		case 'shop':
			table = 'Products'
			break
		case 'events':
			table = 'RestaurantEvents'
			break
		case 'blog':
			table = 'Articles'
			break
		default:
			break 
	}
	const query = 
		` SELECT Photo FROM ${table} WHERE ID = ${id} 
			DELETE ${table} WHERE ID = ${id}
		`
	const { recordset: [ { Photo } ] } = await new sql.Request().query(query)
	req.photo = Photo
	next()
}