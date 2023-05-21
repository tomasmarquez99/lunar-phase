const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const axios = require('axios');
const http = require('node:http');
const { SuperfaceClient } = require('@superfaceai/one-sdk');

app.enable('trust proxy');

app.use(express.json());

app.get('/', async (req,res,next) =>{
  const ip = req.ip;
  console.log(ip);
  next();
})

// You can manage tokens here: https://superface.ai/insights
const sdk = new SuperfaceClient({ sdkAuthToken: 'sfs_3695a2325c1a9f353bf6ea2432932a60141cfbe7346e0760be93b0284e4a76c89ffb275bfc9cba0b626976a0f7513789073b2dc37d1c01c56f2425162a377767_55415deb' });

async function run(ip) {
  // Load the profile
  const profile = await sdk.getProfile('address/ip-geolocation@1.0.1');

  // Use the profile
  const result = await profile
    .getUseCase('IpGeolocation')
    .perform({
      ipAddress: '186.55.248.220'
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
  } catch (error) {
    console.error(error);
  }
}

run();




/*router.get('/', function (req, res) {

  res.sendFile(path.join(__dirname + '/public/index.html'));
  //__dirname : It will resolve to your project folder.

});*/

//add the router
app.use('/', router);
app.use(express.static(__dirname + '/public'));

/*http.get('http://api.weatherapi.com/v1/current.json?key=6d32a8daddf9426ea9732451232704&q=London&aqi=no', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) { console.error(e.message) }
  })
}) */

async function callbackFunction () {
  try {
  
    const response = await axios.get('http://api.weatherapi.com/v1/current.json?key=6d32a8daddf9426ea9732451232704&q=London&aqi=no');
    const { data } = response;
    console.log(data);
  }catch(error){
    console.error(error.message)

}};
callbackFunction();








app.listen(process.env.port || 3000);

console.log('Running at Port 3000');