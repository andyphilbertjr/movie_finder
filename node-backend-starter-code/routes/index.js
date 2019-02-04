const express = require('express')
const router = express.Router();
const path = require('path')
const fs = require('fs');

router.use(express.static(path.join(__dirname, 'views')))

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/favorites', addToDB);

router.get('/favorites',  getData);

module.exports = router

//add a favorited movie to data.json file 
function addToDB(request, response, next){
   if(!req.body.Title || !req.body.imdbID) res.send("Error")
  let movie = JSON.stringify(request.body)
  let data = JSON.parse(fs.readFileSync('data.json', ["Title", "Poster", "imdbID"]));
  data.push(movie)
  fs.writeFile('data.json', JSON.stringify(data, null, 2), () => console.log('movie added'))
  response.send(data)
}

function getData(request, response){
 // let data = fs.readFile('data.json')
 // console.log(data)
  response.json(data)
}


// app.get('/favorites', function(req, res){
//   var data = fs.readFileSync('./data.json');
//   res.setHeader('Content-Type', 'application/json');
//   res.send(data);
// 