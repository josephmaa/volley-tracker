const express = require('express')
const mysql = require('mysql2')
require('dotenv').config();

const app = express()
const port = 5000;

// Parse middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());

// Connect to MySQL
const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.HOST,
	port: process.env.PORT,
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
})

// Get all players
app.get('', (req, res) => {
	pool.getConnection((err, connection) => {
		console.log('connected as id ' + connection.threadId)
		connection.query('SELECT * FROM players.players', (err, rows) => {
			connection.release() // Return the connection from the pool

			if (!err) {
				res.send(rows)
			} else {
				console.log(err)
				// if (err) throw error
			}
		})
	})
})

// Listen on environment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))


