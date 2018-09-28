const express = require('express');
var {CarQuery} = require('car-query')

const carQueryObj = new CarQuery();

const router = express.Router();

router.get('/', (req, res) => res.send(`The car query home router is working!`)); // test router

router.get('/makes', (req, res) => {
    let makesArr = [];
    const { year } = req.params;
    console.log(year);
    carQueryObj.getYears()
      .then(makes => {
        console.log(makes);
        // for (let i = 0; i < makes.length; i++) {
        //     if (makes[i].isCommon === true) {
        //         makesArr.push(makes[i].display);
        //     }
        // }
        // res.json(makesArr);
      })
      .catch(err => {
        console.log(err);
      });    
});

router.get('/models/:year/:make', (req, res) => {
    let makesArr = [];
    const { year, make } = req.params;
    carQueryObj.getModels({ year: year, make: make })
      .then(models => {
        for (let i = 0; i < models.length; i++) {
            makesArr.push(models[i].name);
        }
        res.json(makesArr);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });    
});

router.get('/trims/:year/:make/:model', (req, res) => {
    let trimsArr = [];
    const { year, make, model } = req.params;
    carQueryObj.getTrims({ year: year, make: make, model: model })
      .then(trims => {
        for (let i = 0; i < trims.length; i++) {
            trimsArr.push(trims[i].trim);
        }
        res.json(trimsArr);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });    
});

module.exports = router;