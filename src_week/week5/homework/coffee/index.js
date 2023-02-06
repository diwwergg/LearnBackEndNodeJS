const mysql = require("mysql2/promise");
const express = require("express");

// Express
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Database connection
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

const menu = [
    {
        "name": "latte",
        "size": ["big","small"],
        "sweetness": [100, 75, 50, 0]
    },
    {
        "name": "expresso",
        "size": ["big","small"],
        "sweetness": [100, 75, 50, 0]
    },
    {
        "name": "americano",
        "size": ["big","small"],
        "sweetness": [100, 75, 50, 0]
    }
]


app.get("/menu", async (req, res) => {
    res.status(200).json(menu)
})

// create coffee order
app.post("/coffee",async  (req, res) => {
    const { name, size, sweetness } = req.body;
    const sql = `INSERT INTO coffee_drinks (name, size, sweetness) VALUES ('${name}', '${size}', '${sweetness}')`;
    const [rows, fields] = await connection.execute(sql);
    res.status(200).send(rows)
})

//add sweetness to coffee
app.put("/coffee",async  (req, res) => {
    const { id, sweetness } = req.body;
    const sql = `UPDATE coffee_drinks SET sweetness = '${sweetness}' WHERE id = '${id}'`;
    const [rows, fields] = await connection.execute(sql);
    res.status(200).send(rows)
})

// delete coffee order
app.delete("/coffee/:id", async (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM coffee_drinks WHERE id = '${id}'`;
    const [rows, fields] = await connection.execute(sql);
    res.status(200).send(rows)
})

// get all coffee orders
app.get("/coffee", async (req, res) => {
    const sql = `SELECT * FROM coffee_drinks`;
    const [rows, fields] = await connection.execute(sql);
})

app.get('/' , (req, res) => {
    res.send('Coffee Shop')
})


app.listen(port, () => console.log(`App started on port ${port}!`));