const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'db1',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        console.log(err);
        return;
    }
    console.log('Connection established');
});

// query database db1.user2 and return result
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM user2', (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`App started on port ${port}!`));