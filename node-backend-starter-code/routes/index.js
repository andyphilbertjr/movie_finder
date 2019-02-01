const express = require('express')
const router = express.Router();
const path = require('path')
const fs = require('fs');

// data 
let db = require('../data.json');
const data = fs.readFileSync('data.json')
const favoriteMovies = JSON.parse(data)


router.use(express.static(path.join(__dirname, 'views')))

router.get('/', (req, res) => {
  console.log(favoriteMovies)
  res.render('index')
})

router.post('/favorites', addToDB);

router.get('/favorites',  );

module.exports = router


function addToDB(request, response){

  fs.writeFile('data.json', JSON.stringify(request.body), ()=>   console.log(request.body))

}