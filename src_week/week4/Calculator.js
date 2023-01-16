const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');



const app = express();
const port = 3000;
const htmlPath = path.join(__dirname, 'html');

console.log(htmlPath);


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: htmlPath });
});

// add number 2 number in url parameter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/add?', (req, res) => {
    let num1 = parseInt(req.query.num1);
    let num2 = parseInt(req.query.num2);
    let sum = num1 + num2;
    console .log('Sum is ' + sum);
    console.log(req.body);
    res.send('Sum is ' + sum);
});




app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
