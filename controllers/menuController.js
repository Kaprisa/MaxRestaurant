const sql = require('mssql')

exports.addCategory = async (req, res) => {
	const { category, shortDescription } = req.body
	const query = 
		` IF NOT EXISTS (SELECT ID FROM MenuCategories WHERE Name = '${category}')
				INSERT MenuCategories (Name, shortDescription)
				VALUES ('${category}', '${shortDescription}')
			ELSE
				UPDATE MenuCategories
				SET shortDescription = '${shortDescription}'
				WHERE Name = '${category}'
		`
	//await new sql.Request().query(`INSERT MenuCategories (Name, shortDescription) VALUES ('${category}', '${shortDescription}')`)
	await new sql.Request().query(query)
	res.send('Категория успешно добавлена')
}

exports.addDish = async (req, res) => {
	const { name, category, price, size, calories, ingridients, photo } = req.body
	const query = 
		`EXEC AddDish
			@ID = ${req.params.id || 0},
			@Name = '${name}',
			@Category = '${category}',
			@Price = ${price},
			@Photo = '${photo}',
			@Size = ${size},
			@Calories = ${calories},
			@Ingridients = '${ingridients}'
		`
	await new sql.Request().query(query)
	res.send('Блюдо успешно добавлено')
}

exports.getMenu = async (req, res) => {
	const query = 
		` SELECT D.Name, D.Photo, D.Price, D.IngridientsString, C.Name AS Category, C.ShortDescription FROM MenuDishes D
			JOIN MenuCategories C
			ON C.ID = D.CategoryID
		`
	const { recordset: dishes } = await new sql.Request().query(query)
	let dishCategories = {}
	dishes.forEach(({ Name, Photo, Price, Category, ShortDescription, IngridientsString }) => {
		if (!dishCategories[Category]) dishCategories[Category] = []
		dishCategories[Category].push({
			Name, 
			Photo, 
			Price,
			ShortDescription,
			IngridientsString
		})
	})
	res.render('menu', { name: 'menu', dishCategories })
}
