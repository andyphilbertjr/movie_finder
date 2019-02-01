const express = require('express')
const router = express.Router();
const path = require('path')
const fs = require('fs');

// data 
const db = require('../data.json');


router.use(express.static(path.join(__dirname, 'views')))

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/favorites', addToDB);

router.get('/favorites',  getData);

module.exports = router


function addToDB(request, response){
  let data = fs.writeFile('data.json', JSON.stringify(request.body), ()=>   console.log('file added'))
  response.send(data)
}

function getData(request, response){
  let data = fs.readFileSync('data.json')
  let favoriteMovies = JSON.parse(data)
  response.json(favoriteMovies)
}
