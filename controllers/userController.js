const promisify = require('es6-promisify')
const sql = require('mssql')

const cartQuery =
	`SELECT P.Name, P.Photo, P.Price, P.ID, S.ProductCount AS Count FROM ShoppingCards S
	 JOIN ProductsListView P ON S.ProductID = P.ID
	 WHERE S.UserID =`

const userProfileQuery = 
	`SELECT * FROM UsersProfiles WHERE UserID=`

exports.validateRegister = (req, res, next) => {
	req.checkBody('email', 'Указанный E-Mail не валиден').isEmail()
	req.sanitizeBody('email').normalizeEmail({
		remove_dots: false,
		remove_extention: false,
		gmail_remove_subaddress: false
	})
	req.checkBody('username', 'Имя пользователя не должно быть пустым').notEmpty
	req.checkBody('password', 'Пароль не может быть пустым').notEmpty
	req.checkBody('confirmPassword', 'Подтвердите пароль').notEmpty
	req.checkBody('confirmPassword', 'Пароли не совпадают').equals(req.body.password)
	const errors = req.validationErrors()
	if (errors) {
		res.json({ errors: errors.map(err => err.msg) })
		return
	}
	next()
}

exports.register = async (req, res, next) => {
	const { username, password, email } = req.body
	const query = 
		` INSERT Users (UserName, Email, [Password]) 
		  VALUES ('${username}' ,'${email}', HASHBYTES('SHA2_512', '${password}'))
		  DECLARE @ID int
		  SELECT @ID = (SELECT SCOPE_IDENTITY())
		  SELECT ID, Email FROM Users WHERE ID = @ID
	  `
	const { recordset: [ user ] } = await new sql.Request().query(query)
	req.login(user, (err) => {
		if (err) {
			console.error(err)
		}
	})
	next()
}

exports.isAdmin = (req, res, next) => {
	if (req.user && req.user.role === 'Admin') {
		next()
	} else {
		res.redirect('/')
	}
}

exports.getAccount = (req, res) => {
	const { page = 'profile' } = req.params
	if (req.query.axs) {
		return res.render(`account-tabs/${page}`, { page }, (err, html) => {
			if (err) {
				console.error(err)
				throw Error(err)
			}
			res.send(html)
		})
	}
	res.render('account', { name: 'account', page })
}

exports.getCart = async (req, res) => {
	const otherProductsQuery =
		`	SELECT TOP 3 * FROM ProductsListView
		`
	const discountQuery = 
		` SELECT B.Discount FROM UsersBuyInfo U
			JOIN BonusCardsTypes B ON B.ID = U.BonusCardID
		`
	const [ { recordset: otherProducts }, { recordset: shoppingCart }, { recordset: [ { Discount } ] } ] = await Promise.all([ new sql.Request().query(otherProductsQuery), new sql.Request().query(cartQuery + req.user.ID), new sql.Request().query(discountQuery) ])
	res.render('cart', { name: 'cart', shoppingCart, otherProducts, Discount })
}

exports.getCheckout = async (req, res) => {// Нужно перенаправлять запрос если в корзине нет товаров
	const discountQuery = 
		` SELECT B.Discount FROM UsersBuyInfo U
			JOIN BonusCardsTypes B ON B.ID = U.BonusCardID
		`
	let data = { name: 'checkout' }
	const { user } = req
	if (user) {
		const [ { recordset: shoppingCart }, { recordset: [ { Discount } ] }, { recordset: [ profile ] } ] = await Promise.all([ new sql.Request().query(cartQuery + user.ID), new sql.Request().query(discountQuery), new sql.Request().query(userProfileQuery + user.ID) ])
		if (!shoppingCart.length) res.redirect('back')
		data = { ...data, shoppingCart, Discount, profile 	}
	}
	res.render('checkout', data)
}

exports.updateProfile = async (req, res) => {
	const { lastName, name, phone, address } = req.body
	const { ID } = req.user
	const query = 
		`IF EXISTS (SELECT ID FROM UsersProfiles WHERE UserID = ${ID})
			UPDATE UsersProfiles
			SET UserID = ${ID}, FirstName = '${name}', LastName = '${lastName}', Address = '${address}', Phone = '${phone}'
		 ELSE
		  INSERT UsersProfiles (UserID, FirstName, LastName, Address, Phone)
		  VALUES (${ID}, '${name}', '${lastName}', '${address}', '${phone}')
		`
	await new sql.Request().query(query)
	res.send('Профиль успешно обновлен!')
}

exports.getPurse = async (req, res) => {
	const { recordset } = await new sql.Request().query(`SELECT Balance FROM UsersBuyInfo WHERE UserID = ${req.user.ID}`)
	const balance = recordset.length ? recordset[0].Balance : 0
	if (req.query.axs) {
		return res.render(`account-tabs/purse`, { page: 'purse', balance }, (err, html) => {
			if (err) throw Error(err)
			res.send(html)
		})
	}
	res.render('account', { name: 'account', page: 'purse', balance })
}

exports.getBonus = async (req, res) => {
	const { ID } = req.user
	const query =
		`SELECT T.Discount, T.Name, B.WastedMoney FROM UsersBuyInfo B
		 JOIN BonusCardsTypes T
		 ON T.ID = B.BonusCardID
		 WHERE B.UserID = ${ID}
		 SELECT Min(MinWastedMoney) AS NextBonus FROM BonusCardsTypes
		 WHERE MinWastedMoney > (SELECT T.MinWastedMoney FROM UsersBuyInfo B JOIN BonusCardsTypes T ON B.BonusCardID = T.ID WHERE B.UserID = ${ID})`
	const { recordsets: [ recordset, [ { NextBonus } ] ] } = await new sql.Request().query(query)
	if (!recordset || !recordset.length) return (req.query.axs ? res.send() : res.redirect('back'))
	const { Discount, Name, WastedMoney } = recordset[0]
	const data = {
		name: 'account',
		page: 'bonus',
		percent: Math.round((WastedMoney / NextBonus) * 100),
		discount: Discount,
		BonusCard: Name
	}
	if (req.query.axs) {
		return res.render(`account-tabs/bonus`, data, (err, html) => {
			if (err) throw Error(err)
			res.send(html)
		})
	}
	res.render('account', data)
}





