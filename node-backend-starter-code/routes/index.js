const express = require('express')
const router = express.Router();
const path = require('path')
const db = require('../data.json');
const fs = require('fs');
router.use(express.static(path.join(__dirname, '/public')))



router.post('/favorites', function(req, res){
  if(!req.body.Title || !req.body.imdbID){
    res.send("Error");
    return
  }
  console.log('works here')
  var data = JSON.parse(fs.readFileSync('../data.json'));
  data.push(req.body);
  fs.writeFile(db, JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

router.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  console.log(data)
  res.setHeader('Content-Type', 'application/json');
  res.send(data)
});

module.exports = router