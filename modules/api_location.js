const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const app = express();
app.use(cookieParser());

//here I'm creating the city class, to retrieve the city name using the Geoapify API. 
//I'm also exporting the city class so I can call the class is app.js
class city { 
    getName(){

   return axios
    .get('https://api.geoapify.com/v1/ipinfo?&apiKey=0fd836cb96ca414dbfc41f3ad9dfb1eb')
    .then(response => {
      this.cityName = response.data.city.names.en
    //cityName property is being set using this. 
    //using the getName method I'm assigning the city name to the cityName (using this.cityName) property
    })
    .catch(function (error) {
      console.log(error);
    });
    };
  }
  
    module.exports = city