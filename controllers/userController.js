const promisify = require('es6-promisify')
const sql = require('mssql')

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
		  SELECT SCOPE_IDENTITY() AS ID
	  `
	const result = await new sql.Request().query(query)
	const user_id = result.recordset[0]
	req.login(user_id, (err) => {
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

/*exports.updateProfile = async (req, res) => {
	const { name, lastName, phone, address } = req.body
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
}*/





