const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mysql = require('mysql2');
const { query } = require('express');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'pim',
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.post('/stock', (req, res) => {
    const product_name = req.query.product_name;
    const stock_left = Number(req.query.stock_left);
    const category = req.query.category;

    const query = `INSERT INTO stock (product_name, stock_left, category)
  VALUES ('${product_name}', ${stock_left}, '${category}')`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log('Stock added to the database');
        res.send('Stock added to the database');
    });
});

app.get('/stock', (req, res) => {
    const query = 'SELECT * FROM stock';

    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log('Stock fetched from the database');
        res.send(result);
    });
});

app.get('/stock/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM stock WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log('Stock fetched from the database');
        res.send(result);
    });
});

app.put('/stock/:id', (req, res) => {
    const id = req.params.id;
    const product_name = req.query.product_name;
    const stock_left = req.query.stock_left;
    const category = req.query.category;

    const query = `UPDATE stock 
  SET product_name = '${product_name}', stock_left = ${stock_left}, category = '${category}'
  WHERE id = ${id}`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log('Stock updated in the database');
        res.send('Stock updated in the database');
    });
});

app.delete('/stock/:id', (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM stock WHERE id = ${id}`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log('Stock deleted from the database');
        res.send('Stock deleted from the database');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
