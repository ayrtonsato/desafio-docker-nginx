const express = require('express')
const mysql = require('mysql')
const path = require('path')
const sqlQuery = require('./sql')
const { randomString } = require('./utils')

const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database:'nodedb'
};

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/'));

app.get('/', async (req, res) => {
	console.log('Adding new register')
	const connection = mysql.createConnection(config)
	const stmtInsert = `INSERT INTO people(name) VALUES ('Ayrton${randomString(3)}')`
	const stmtSelect = `SELECT * FROM people`
	await sqlQuery(connection, stmtInsert)
	const result = await sqlQuery(connection, stmtSelect)
	const names = result.map(value => value.name)
	res.render('template', { names });
})

const PORT = process.env.PORT || 3000
app.listen(PORT || 3000 , () => {
	console.log(`Listening on port ${PORT}`)
})