const express = require('express'); //import express
const app = express(); 

const data = [
    {
      id: 1,
      firstname: 'Somchai',
      lastname: 'Jaidee',
    },
    {
      id: 2,
      firstname: 'Tony',
      lastname: 'Stark',
    },
 ]


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

// get /my-json-api3 
app.get('/my-json-api3', (req, res) => {
    res.json({
        'University': 'PIM',
    });
}
);

// get /users2
app.get('/users2', (req, res) => {
    res.json({data});
}
);

 app.listen(3000, () => {
    console.log('Server started on port 3000');
    console.log('click link http://localhost:3000');
});

// path: src_week\week1\homeWork1_3.js

