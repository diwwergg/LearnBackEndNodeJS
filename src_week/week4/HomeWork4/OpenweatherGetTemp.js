const express = require('express');
const app = express();
const port = 3000;
const request = require('request');
const openweatherApi = {
    key: 'fa9536893743fbb19dc8aa724a3f04cc',
    city: 'Nonthaburi'
}
const api = `http://api.openweathermap.org/data/2.5/weather?q=${openweatherApi.city}&appid=${openweatherApi.key}&units=metric`;
const api2 = `https://openweathermap.org/data/2.5/weather?id=1608048&appid=${openweatherApi.key}&units=metric`;

app.get('/', (req, res) => {
    res.send(`<h1>Openweather Get Temp</h1>`);
});

app.get('/getTemp', (req, res) => {
    request(api, (error, response, body) => {
        if (error) {
            console.log(error);
            res.send('Error').status(400);

        } else {
            const data = JSON.parse(body);
            console.log(data);
            res.send(data).status(200);
        }
    });

});

app.get('/getTemp2', (req, res) => {
    request(api2, (error, response, body) => {
        if (error) {
            console.log(error);
            res.send('Error').status(400);
        } else {
            const data = JSON.parse(body);
            console.log(data);
            res.send(data).status(200);
        }
    });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
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

