const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const router = express.Router();
const axios = require('axios');
const cookieParser = require('cookie-parser');
const apiLocation = require('./modules/api_location');
const city = require('./modules/api_location');

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(cookieParser())


//In the below code line I'm creating the cityrealname instance of the city class
var cityrealname = new city();
let responseToClient;

app.get('/api', async (req, res) => {
let cityNameVariable;

  //afterwards, i call the getName() method to retrieve the city's name.
await cityrealname.getName().then(() => {
  cityNameVariable = cityrealname.cityName;
  });
  try {
    const apiKey = process.env.WEATHER_KEY;
    const city_query = cityNameVariable; //city string to call the lunar phase
    const response = await axios.get(`http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${city_query}&aqi=no`);
    const { data } = response;
    responseToClient = data
    console.log(responseToClient)
    res.json({message: responseToClient})

  } catch (error) {
    console.error(error.message);
  }
});





//add the router

//router.use('/', router);
app.use(express.static(__dirname + '/public'));


app.listen(3001);

console.log('Running at Port 3001');