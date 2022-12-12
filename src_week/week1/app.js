const express = require('express'); //import express
const app = express(); 

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

// get /about
app.get('/about', (req, res) => {
    res.send(
        '<h1 style="background-color: aquamarine;">This is about page.</h1>'
    );
}
);

app.get('/my-html', (req, res) => {
    res.send('<h1>Hello Would</h1>');
}
);

app.get('/my-json-api', (req, res) => {
    res.send({
        name: 'Thawatchai Buachan'
    });
}
);

app.get('/my-json-api2', (req, res) => {
    res.json({
        name: 'Thawatchai Buachan',
        age: 22,
        email: 'tawatchaibuajun@gmail.com'
    });
}
);
// get /my-json-api3 
app.get('/my-json-api3', (req, res) => {
    res.json({
        'University': 'PIM',
    });
}
);

app.get('/my-id', (req, res) => {
    res.send('My ID is 62130500021');
});

// Homework 3
app.get('/read-user', (req, res) => {
    res.sendFile('Day1/users.json', { root: __dirname });
});

// get /users2
app.get('/users2', (req, res) => {
    res.json({data});
}
);

app.listen(3000, () => {
    // set text in terminal color is green 
    console.log('\x1b[31m%s\x1b[0m', 'Server started on port 3000');
    console.log('\x1b[32m%s\x1b[0m','click link http://localhost:3000');
});

// path: src_week\week1\app.js