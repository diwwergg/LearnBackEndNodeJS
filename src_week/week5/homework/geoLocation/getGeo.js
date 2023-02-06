const express = require ('express');
const https = require ('http');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/getGeoLocation.html');
});

app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}`)
});


const openweatherApi = {
    key: 'fa9536893743fbb19dc8aa724a3f04cc',
    city: 'Nonthaburi'
}
const api = `http://api.openweathermap.org/data/2.5/weather?q=${openweatherApi.city}&appid=${openweatherApi.key}&units=metric`;
const api2 = `https://openweathermap.org/data/2.5/weather?id=1608048&appid=${openweatherApi.key}&units=metric`;


app.get('/getTempLatLong', (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const api1 = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openweatherApi.key}&units=metric&lang=th`;
    https.get(api1, (response) => {
        console.log(response.statusCode);
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.write(`<h1> บรรยากาศนั้น  ${weatherDescription}</h1>`);
            res.write(`<h1> อุณหภูมิใน ${weatherData.name} เป็น ${temp} องศาเซลเซียส.</h1>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" style = 'height:300px; weight:300px; background-color:#fada33; '>`);
            res.send();
        });
    });
});