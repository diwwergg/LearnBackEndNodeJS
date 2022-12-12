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

app.get('/test', (req, res) => {
    res.sendFile('src/html/test.html', { root: __dirname });
}
);

//start express server
app.listen(3000, () => {
    console.log('Server started on port 3000');
}
);


//run node index.js in terminal to start server use command: node index.js

//open browser and go to localhost:3000 to see the result

export default app;