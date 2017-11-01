const sql = require('mssql')

exports.book = async (req, res) => {
	const { name, email, phone, subject, table, time, msg } = req.body
	const query = 
		`IF NOT EXISTS (SELECT ID FROM ReservationSubjects WHERE Name = '${subject}')
				INSERT ReservationSubjects
				VALUES ('${subject}')
		 INSERT Reservations (CustomerName, CustomerEmail, CustomerPhone, SubjectID, TableNum, Time, Message)
		 VALUES ('${name}', '${email}', '${phone}', (SELECT ID FROM ReservationSubjects WHERE Name = '${subject}'), ${table}, '${time}', '${msg}')
		`
	await new sql.Request().query(query)
	res.send('Ваше бронирование успешно оформлено!')
}