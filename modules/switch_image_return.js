const express = require('express');

const app = express();

class imagePhase {

    ReturnImgURL(lunarPhase) {
     let FASELUNAR
        switch (lunarPhase) {
            case "First Quarter":
                console.log("la URL es: " + lunarPhase)
                break
            case "Waxing Gibbous":
               
               FASELUNAR = 'First-Quarter.jpg' 
               return FASELUNAR
            case "Waning Gibbous":
                FASELUNAR = 'Waning-Gibbous.jpg'
                return FASELUNAR
                break
        }

       

    };


}

module.exports = imagePhase