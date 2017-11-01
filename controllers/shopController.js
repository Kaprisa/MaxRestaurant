const sql = require('mssql')

const cartQuery =
	`SELECT P.Name, P.Photo, P.Price, P.ID, S.ProductCount AS Count FROM ShoppingCards S
	 JOIN ProductsListView P ON S.ProductID = P.ID
	 WHERE S.UserID =`

const menuQuery = 
	`SELECT T.Name AS Type, C.TypeID, C.Name AS Category, C.ID FROM ProductTypes T
	 JOIN ProductCategories C ON T.ID = C.TypeID
	`

const topQuery =
	` SELECT TOP 5 P.ID, P.Name, P.Photo, P.Price FROM ProductsListView P
		LEFT JOIN (SELECT SUM(Rating) AS Rating, ProductID FROM Reviews GROUP BY ProductID) R ON R.ProductID = P.ID
		ORDER BY R.Rating`

const groupCategoriesByTypes = (arr) => {
	const obj = {}
	arr.forEach(({ Type, TypeID, Category, ID }) => {
		if (!obj[Type]) obj[Type] = []
		obj[Type].push({
			Category,
			ID,
			TypeID
		})
	})
	return obj
}

exports.editProduct = async (req, res) => {
	const { id = 0 } = req.params
	const { name, type, price, desc, category } = req.body
	const query = 
		`	EXEC AddProduct
			 @ID = ${id},
			 @Name = '${name}',
			 @Type = '${type}',
			 @Category = '${category}',
			 @Price = ${price},
			 @Description = '${desc}'
		`
	await new sql.Request().query(query)
	res.send(`Модель Продукта успешно ${id === 0 ? 'добавлена' : 'обновлена'}, теперь вы можете добавить ее продукты различных цветов с фотографиями!`)
}

exports.addProductVariety = async (req, res) => {
	const { photo, color, quantity } = req.body
	const query = 
		`IF NOT EXISTS (SELECT ID FROM Colors WHERE Name = '${color}')
			INSERT Colors VALUES ('${color}')
		 INSERT Products (Photo, Color, ModelID)
		 VALUES ('${photo}', (SELECT ID FROM Colors WHERE Name = '${color}'), ${req.params.id})
		 INSERT Stock (ProductID, Qty)
		 VALUES ((SELECT SCOPE_IDENTITY()), ${quantity || 0})
		`
	await new sql.Request().query(query)
	res.send('Продукт успешно добавлен!')
}

exports.getShop = async (req, res) => {
	const { sort = 'ID' } = req.query
	const { page = 1, type = 0, category = 0 } = req.params
	const limit = 6
	const skip = ( page * limit ) - limit
	const query = 
		`EXECUTE ShopPagination 
			@Page = ${page},
			@Limit = ${limit},
			@SortColumn = '${sort}',
			@Type = ${type},
			@Category = ${category}
		`
	const [ { recordset: products }, { recordset: [ { count = 0 } ] } ] = await Promise.all([ new sql.Request().query(query), new sql.Request().query(`SELECT COUNT(*) AS count FROM ProductsView WHERE (TypeID = ${type} OR ${type} = 0) AND (CategoryID = ${category} OR ${category} = 0)`) ])
	const pages = Math.ceil( count / limit )
	let data = { name: 'shop', products, page, pages, count, sort, type, category }
	if (req.query.axs) {
		if (!products.length && skip) return
		res.render('partials/productsList', data, (err, html) => res.send(html))
	} else {
		if (!products.length && skip) {
			res.redirect(`/shop/page/${pages}`)
			return
		}
		const [ { recordset: menu }, { recordset: topProducts } ] = await Promise.all([ new sql.Request().query(menuQuery), new sql.Request().query(topQuery) ])
		const menuTypes = groupCategoriesByTypes(menu)
		data = { ...data, menuTypes, topProducts }
		if (req.user) {
			const { recordset: shoppingCart } = await new sql.Request().query(cartQuery + req.user.ID)
			data['shoppingCart'] = shoppingCart
		}
		res.render('shop', data)
	}	
}

exports.getProduct = async (req, res) => {
	const { id } = req.params
	const query =
		` SELECT Colors.Name AS Color, P.Photo, P.ID, CONCAT(C.Name, ' ', M.Name, ' ', Colors.Name) AS Name, M.Price, M.Description, M.CategoryID, C.Name AS Category, T.Name AS Type FROM Products P 
			JOIN ProductModels M ON M.ID = P.ModelID
			JOIN ProductCategories C ON C.ID = M.CategoryID
			JOIN ProductTypes T ON T.ID = C.TypeID
			JOIN Colors ON Colors.ID = P.Color
			WHERE P.ID = ${id}
		`
	const reviewsQuery = 
		`SELECT R.ID, CONCAT(P.FirstName, ' ',P.LastName) AS Name, R.Text, R.Rating, R.Created, P.UserID FROM Reviews R
		 LEFT JOIN UsersProfiles P ON P.UserID = R.UserID
		 WHERE R.ProductID = ${id}
		` 
	const ratingQuery = 
	`SELECT AVG(Rating) AS rating FROM Reviews
	 WHERE ProductID = ${id}
	`
	const [{ recordset: [ product ] }, { recordset: reviews }, { recordset: [ { rating } ] }] = await Promise.all([ new sql.Request().query(query), new sql.Request().query(reviewsQuery), new sql.Request().query(ratingQuery) ])
	const sameProductsQuery =
		`	SELECT TOP 3 * FROM ProductsListView
			WHERE CategoryID = ${product.CategoryID} AND NOT ID = ${product.ID}
		`
	const [ { recordset: sameProducts }, { recordset: menu }, { recordset: topProducts } ] = await Promise.all([ new sql.Request().query(sameProductsQuery), new sql.Request().query(menuQuery), new sql.Request().query(topQuery) ])
	const menuTypes = groupCategoriesByTypes(menu)
	let data = { name: 'product', product, sameProducts, menuTypes, rating, reviews, topProducts }
	if (req.user) {
		const [ { recordset: likes }, { recordset: shoppingCart } ] = await Promise.all([ new sql.Request().query(`SELECT UserID FROM ProductLikes WHERE ProductID = ${id}`), new sql.Request().query(cartQuery + req.user.ID) ])
		data = {
			...data,
			hearted: likes && likes.length && likes.some(like => like.UserID = req.user.ID) ? true : false,
			likesCount: likes ? likes.length : 0,
			shoppingCart
		}
	}
	res.render('product', data)
}

exports.removeModel = async (req, res) => {
	await new sql.Request().query(`DELETE ProductModels WHERE ID = ${req.params.id}`)
	res.send('Модель продукта успешно удалена!')
}

