const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
const htmlPath = path.join(__dirname, 'html');
// my folder is week4/html/bmi.html

app.get('/', (req, res) => {
    res.sendFile('bmi.html', { root: htmlPath });
}
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const bmiText = (bmi) => {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};


// http://localhost:3000/bmi?weight=52&height=166
// send status 200


app.get('/bmi', (req, res) => {
    const weight = parseFloat(req.query.weight);
    const height = parseFloat(req.query.height);
    const bmi = (weight / (height / 100) ** 2).toFixed(2);
    res.status(200)
    .send(`Your BMI is ${bmi} (${bmiText(bmi)})`);
});


app.listen(port, () => console.log(`app listening on port ${port}!`));

// Path: src_week\week4\html\bmi.html