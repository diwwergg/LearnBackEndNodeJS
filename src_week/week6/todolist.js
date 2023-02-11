// this is application express and insert ejs file to html

// Path: week6\app.js
const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

let items =['Buy Food', 'Cook Food', 'Eat Food']

app.get('/', (req, res) => {
    const today = new Date();
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    const day = today.toLocaleDateString('en-US', options);
    res.render('list', {kindOfDay: day, newListItems: items? items: []});
}
);

app.post('/', (req, res) => {
    const item = req.body.newItem;
    console.log(item);
    items.push(item);
    res.redirect('/');
}
);

app.post('/delete', (req, res) => {
    const deleteItem = req.body.deleteItem;
    console.log(deleteItem);
    items.includes(deleteItem) ? items.splice(items.indexOf(deleteItem), 1) : console.log('not found');
    res.redirect('/');
}
);

app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}`)
}
);