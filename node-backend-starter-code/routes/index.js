const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const db = require('../data.json');
const fs = require('fs');

router.post('/favorites', function(req, res){
  console.log(req.body)
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return
  }
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
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