// require('dotenv').config()
// const Api_Key = process.env.api_key
// let url = `http://www.omdbapi.com/?apikey=${Api_Key}&`
const express = require('express')
const router = express.Router();
//const helpers = require('../public/scripts/helpers')
const path = require('path')
let db = require('../data.json');
const fs = require('fs');
router.use(express.static(path.join(__dirname, 'views')))

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/favorites', function(req, res){
  if(!req.body.Title || !req.body.imdbID){
    res.send("Error");
    return
  }
  // let data = fs.writeFileSync(db, req.body)
    db.favs.push(req.body)
    console.log(db.on(req))
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/')
});

router.get('/favorites', function(req, res){
  console.log(db)
  var data = fs.readFileSync(db);
  console.log(data)
  res.setHeader('Content-Type', 'application/json');
  res.send(data)
});

module.exports = router


function addToDB(data){
  data.push(req.body);
  fs.writeFile(db, JSON.stringify(data))
}