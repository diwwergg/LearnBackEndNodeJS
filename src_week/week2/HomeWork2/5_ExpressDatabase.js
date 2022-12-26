const express = require("express");
const app = express();
const mysql = require("mysql2");


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'bookstore',
    port: 3306
});
connection.connect();

app.get("/query-1", (req, res) => {
    connection.query("select bname, isbn from books where bname like '%o%' limit 2", (err, rows, fields) => {
        if (err) console.log(err);
        console.log(rows);
        res.json(rows);
    });
});
app.get("/query-2", (req, res) => {
    connection.query("select sum(amount) as total from sell_histories", (err, rows, fields) => {
        if (err) console.log(err);
        console.log(rows);
        res.json(rows);
    });
});
app.get("/query-3", (req, res) => {
    connection.query("select distinct isbn from sell_histories", (err, rows, fields) => {
        if (err) console.log(err);
        console.log(rows);
        res.json(rows);
    });
});
app.get("/query-4", (req, res) => {
    connection.query("select sum( amount*price ) as sell_total from sell_histories", (err, rows, fields) => {
        if (err) console.log(err);
        console.log(rows);
        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log("Server started");
});