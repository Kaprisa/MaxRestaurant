const sql = require('mssql')

exports.editEvent = async (req, res) => {
	const { id = 0 } = req.params
	const { photo, name, desc, subject, location: address, categories } = req.body
	const query =
		`EXEC AddEvent
			@ID = ${id},
			@Photo = '${photo}',
			@Name = '${name}',
			@Description = '${desc}',
			@Subject = '${subject}',
			@Address = '${address}',
			@Categories = '${categories}'
		`
	await new sql.Request().query(query)
	res.send(`Событие успешно ${id === 0 ? 'добавлено' : 'обновлено'}!`)
}
