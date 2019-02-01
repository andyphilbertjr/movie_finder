const express = require('express')
const router = express.Router();
const path = require('path')
const fs = require('fs');

// data 
const db = 'data.json[faves]' ;


router.use(express.static(path.join(__dirname, 'views')))

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/favorites', addToDB);

router.get('/favorites',  getData);

module.exports = router

function addToDB(request, response, next){
  let movie = JSON.stringify(request.body, null, 2)
  fs.appendFile('data.json', ',' + movie, () => console.log('movie added'))
  response.send(movie)
  next()
}

function getData(request, response){
  let data = fs.readFile('data.json')
  console.log(data)
  response.json(data)
}
