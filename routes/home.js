var express = require('express');
var router = express.Router();
var users = require("../services/users.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  users.users(function(result){
    console.log(result);
    res.render('home/index', {users: result});
  });  
});

router.post('/', function(req, res, next){
  console.log('post');
  res.send('post request to the home page');
});

module.exports = router;