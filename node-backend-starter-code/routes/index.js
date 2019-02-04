const express = require('express')
const router = express.Router();
const path = require('path')
const fs = require('fs');

// data 



router.use(express.static(path.join(__dirname, 'views')))

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/favorites', addToDB);

router.get('/favorites',  getData);

module.exports = router

function addToDB(request, response, next){
  let movie = request.body
  var data = JSON.parse(fs.readFileSync('data.json'));
  data.push(JSON.stringify(movie))
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
// ;

// app.get('favorites', function(req, res){
//   if(!req.body.name || !req.body.oid){
//     res.send("Error");
//     return
  

//   fs.writeFile('./data.json', JSON.stringify(data));
//   res.setHeader('Content-Type', 'application/json');
//   res.send(data);
// });