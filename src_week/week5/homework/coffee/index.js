const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// connect to mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'pim',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});


const menu = {
    coffee_name: ['Americano', 'Cappuccino', 'Espresso', 'Latte', 'Mocha'],
    size: ['Small', 'Medium', 'Big'],
    sweetness: [100, 70, 50, 30, 0]
}

app.get('/', (req, res) => {
    res.send('Coffee Shop');
});

app.get('/menu', (req, res) => {
    res.status(200).json(menu);
});

// create coffee order
app.post('/coffee' ,(req, res) => {
    const coffee_name = req.query.coffee_name;
    const size = req.query.size;
    const sweetness = req.query.sweetness;
    if (coffee_name === undefined || size === undefined || sweetness === undefined) {
        res.status(400).json({ message: `coffee_name = ${coffee_name} size = ${size} sweetness = ${sweetness}` });
        return;
    }
    const sql = `INSERT INTO coffee (coffee_name, size, sweetness) VALUES ('${coffee_name}', '${size}', ${sweetness})`;
    connection.query(sql, (err, results, fields) => {
        if (err) {
            res.status(400).json({ message: err });
            return;
        }
        res.status(200).json(results);
    });

})

// get coffee order all 
app.get('/coffee', (req, res) => {
    const sql = `SELECT * FROM coffee`;
    connection.query(sql, (err, results, fields) => {
        if (err) {
            res.status(400).json({ message: err });
            return;
        }
        res.status(200).json(results);
    });
});

// get coffee order by id
app.get('/coffee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM coffee WHERE id = ${id}`;
    connection.query(sql, (err, results, fields) => {
        if (err) {
            res.status(400).json({ message: err });
            return;
        }
        res.status(200).json(results);
    }
    );
});

// update coffee order by id
app.put('/coffee/:id', (req, res) => {
    const id = req.params.id;
    const coffee_name = req.query.coffee_name;
    const size = req.query.size;
    const sweetness = req.query.sweetness;
    if (coffee_name === undefined || size === undefined || sweetness === undefined) {
        res.status(400).json({ message: `coffee_name = ${coffee_name} size = ${size} sweetness = ${sweetness}` });
        return;
    }
    const sql = `UPDATE coffee SET coffee_name = '${coffee_name}', size = '${size}', sweetness = ${sweetness} WHERE id = ${id}`;
    connection.query(sql, (err, results, fields) => {
        if (err) {
            res.status(400).json({ message: err });
            return;
        }
        res.status(200).json(results);
    });

});

// delete coffee order by id    
app.delete('/coffee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM coffee WHERE id = ${id}`;
    connection.query(sql, (err, results, fields) => {
        if (err) {
            res.status(400).json({ message: err });
            return;
        }
        res.status(200).json(results);
    }
    );
});


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});