const express = require('express')
const router = express.Router();
const path = require('path')
const db = require('../data.json');
const fs = require('fs');
router.use(express.static(path.join(__dirname, 'views')))

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/favorites', function(req, res){
  console.log(req.body)
  if(!req.body.Title || !req.body.imdbID){
    res.send("Error");
    return
  }
  var data = JSON.parse(fs.readFileSync(db));
  data.push(req.body);
  fs.writeFile(db, JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

router.get('/favorites', function(req, res){
  var data = fs.readFileSync(db);
  console.log(data)
  res.setHeader('Content-Type', 'application/json');
  res.send(data)
});

module.exports = router