const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const router = express.Router();
const axios = require('axios');
const city = require('./modules/api_location');
const phaseURL = require('./modules/switch_image_return');

require('dotenv').config();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors());
app.use(cors(corsOptions));


//In the below code line I'm creating the cityrealname instance of the city class
var cityrealname = new city();
var phaseURLreturn = new phaseURL();
let moonResponse;

app.get('/api', async (req, res) => {
  let cityNameVariable;
  let phase;

  //afterwards, i call the getName() method to retrieve the city's name.
  await cityrealname.getName().then(() => {
    cityNameVariable = cityrealname.cityName;
  });
  try {
    const apiKey = process.env.WEATHER_KEY;
    const city_query = cityNameVariable; //city string to call the lunar phase
    const response = await axios.get(`http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${city_query}&aqi=no`);
    const { data } = response;

    moonResponse = data
    console.log(moonResponse)
    phase = moonResponse.astronomy.astro.moon_phase
   
    moonResponse = phaseURLreturn.ReturnImgURL(phase)
    
    console.log(moonResponse)
    res.json({ message: moonResponse })

  } catch (error) {
    console.error(error.message);
  }
});

//add the router

//router.use('/', router);
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors(corsOptions));

app.listen(3001);

console.log('Running at Port 3001');