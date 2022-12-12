const express = require('express'); //import express
const app = express(); 

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

// Homework 3
app.get('/read-user', (req, res) => {
    res.sendFile('Day1/users.json', { root: __dirname });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
    console.log('click link http://localhost:3000');
});

// path: src_week\week1\homeWork1_3.js