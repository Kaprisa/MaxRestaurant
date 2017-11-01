const sql = require('mssql')

exports.order = async (req, res) => {
	const { address, phone, delivery } = req.body
	const priceQuery =
    `SELECT SUM(M.Price * S.ProductCount) AS price FROM ShoppingCards S
		 JOIN Products P ON P.ID = S.ProductID
		 JOIN ProductModels M ON M.ID = P.ModelID
		 WHERE UserID = ${req.user.ID}
		`
  const { recordset: [ { price } ] } = await new sql.Request().query(priceQuery)
	const { ID } = req.user
	const query = 
		`IF (SELECT Balance FROM UsersBuyInfo WHERE UserID = ${ID}) > ${price}
			BEGIN
				INSERT Orders (UserID, Address, Phone, Delivery, TotalPrice)
				VALUES (${ID}, '${address}', '${phone}', ${delivery ? 1 : 0}, ${price})
				SELECT 'Ваш заказ успешно оплачен!' AS msg, 'success' AS action
			END
		 ELSE
		 	SELECT 'На вашем счету недостаточно денег' AS msg, 'error' AS action
		`
	const { recordset: [ { msg, action } ] } = await new sql.Request().query(query)
	res.send({ msg, action })
}

exports.getOrders = async (req, res) => {
	const query =
		`SELECT Created, TotalPrice
		 FROM Orders
		 WHERE UserID = ${req.user.ID}
		`
	const { recordset: orders } = await new sql.Request().query(query)
	if (req.query.axs) {
		return res.render('account-tabs/orders', { page:  'orders', orders }, (err, html) => {
			if (err) throw Error(err)
			res.send(html)
		})
	}
	res.render('account', { name: 'account', page: 'orders', orders })
}