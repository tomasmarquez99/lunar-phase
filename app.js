const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const router = express.Router();
const axios = require('axios');
const { SuperfaceClient } = require('@superfaceai/one-sdk');

require('dotenv').config();

app.use(express.json());
app.use(cors());


async function fetchData(city) {
  try {
    const apiKey = process.env.WEATHER_KEY;
    const city_query = 'Montevideo' //city string to call the lunar phase
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city_query}&aqi=no`);
    const { data } = response;
    //console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// You can manage tokens here: https://superface.ai/insights
const sdk = new SuperfaceClient({ sdkAuthToken: 'sfs_3695a2325c1a9f353bf6ea2432932a60141cfbe7346e0760be93b0284e4a76c89ffb275bfc9cba0b626976a0f7513789073b2dc37d1c01c56f2425162a377767_55415deb' });

async function run(ip) {

  // Load the profile
  const profile = await sdk.getProfile('address/ip-geolocation@1.0.1');

  // Use the profile
  const result = await profile
    .getUseCase('IpGeolocation')
    .perform({
      ipAddress: ip
    }, {
      provider: 'ipdata',
      security: {
        apikey: {
          apikey: '400f8681c5367108f6179a04f11457cade1c52ae4d545d0e0c779e23'
        }
      }
    });

  // Handle the result
  try {
    const data = result.unwrap();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchMultipleData(ip) {
  var arrayOfResults = [];
  const ipResult = await fetchData();
  arrayOfResults.push(ipResult)

  const locationinfo = await run(ip);
  arrayOfResults.push(locationinfo)

  console.log(arrayOfResults)
  return arrayOfResults;

}

app.get('/location', async (req, res, next) => {

  const clientIP = req.connection.remoteAddress
  const ip = clientIP.slice(7)
  try {
    const information = await fetchMultipleData(ip);
    res.send(information)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error')
  }
})


router.get('/', async (req, res) => {

});

router.get('/public/index.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

//add the router
app.use('/', router);
app.use(express.static(__dirname + '/public'));




app.listen(process.env.port || 3000);

console.log('Running at Port 3000');