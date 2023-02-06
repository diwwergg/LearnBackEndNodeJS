const express = require ('express');
const https = require ('http');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/checkTemp.html');
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

app.get('/getTemp', (req, res) => {
    https.get(api, (response) => {
        console.log(response.statusCode);
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.writeHead(200, {'Content-Type': 'text/html charset=utf-8'});
            res.write(`<h1>The weather is currently ${weatherDescription}</h1>`);
            res.write(`<h1>The temperature in ${openweatherApi.city} is ${temp} degree Celcius.</h1>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" style = 'height:300px; weight:300px; background-color:black; '>`);
            res.send();
        });
    });
});


app.get('/getTemp2', (req, res) => {
    const city1 = req.query.city;
    const api1 = `http://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${openweatherApi.key}&units=metric`;
    https.get(api1, (response) => {
        console.log(response.statusCode);
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.write(`<h1> The weather is  ${weatherDescription}</h1>`);
            res.write(`<h1>The temperature in ${weatherData.name} is ${temp} degree Celcius.</h1>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" style = 'height:300px; weight:300px; background-color:#fada33; '>`);
            res.send();
        });
    });
});

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


/**

{
  "coord": {
    "lon": 100.5167,
    "lat": 13.75
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 304.13,
    "feels_like": 303.9,
    "temp_min": 303.66,
    "temp_max": 307,
    "pressure": 1008,
    "humidity": 39,
    "sea_level": 1008,
    "grnd_level": 1007
  },
  "visibility": 10000,
  "wind": {
    "speed": 2,
    "deg": 24,
    "gust": 2.49
  },
  "clouds": {
    "all": 57
  },
  "dt": 1674291406,
  "sys": {
    "type": 2,
    "id": 2079808,
    "country": "TH",
    "sunrise": 1674258341,
    "sunset": 1674299522
  },
  "timezone": 25200,
  "id": 1609350,
  "name": "Bangkok",
  "cod": 200
}

*/
