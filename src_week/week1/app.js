const express = require('express'); //import express
const app = express(); 

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.get('/about', (req, res) => {
    res.send('Mr. Thawatchai Buachan');
}
);

app.get('/my-html', (req, res) => {
    res.send('<h1>Hello Would</h1>');
}
);

app.get('/my-json-api', (req, res) => {
    res.json({
        name: 'Thawatchai Buachan',
        age: 22,
        email: 'tawatchaibuajun@gmail.com'
    });

}
);

// my-id
app.get('/my-id', (req, res) => {
    res.send('My ID is 62130500021');
});

app.listen(3000, () => {
    // set text in terminal color is green 
    console.log('\x1b[31m%s\x1b[0m', 'Server started on port 3000');
    console.log('\x1b[32m%s\x1b[0m','click link http://localhost:3000');
});

// path: src_week\week1\app.js