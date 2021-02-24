const sqlQuery = (connection, stmt) => {
	return new Promise((resolse, reject) => {
		connection.query(stmt, (error, results) => {
			if (error) {
				return reject(error)
			}
			return resolse(results)
		});
	})
}

module.exports = sqlQuery