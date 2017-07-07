var express = require('express');
var router = express.Router();
var profile = require("../services/profile.js");

//Profile - VIEW: new
//-----------------------------------------------------------------------------
router.get('/new', function(req, res, next){    
  res.render('profile/new');
});

router.post('/new', function(req, res, next){ 
    console.log('teste')  ;
  profile.save("PROFILE", req.body);
  res.redirect('./');
});

//-----------------------------------------------------------------------------

//Profile - VIEW: index
//-----------------------------------------------------------------------------
router.get('/', function(req, res, next){  
  var searchExpression = {};
  
  if(req.query.Profile != undefined){ 
    console.log(req.query);   
    
    searchExpression = {$and: [{Profile: {$regex: req.query.Profile}}] };
    
    profile.get("PROFILE", searchExpression, function(erro, data){    
      console.log(data)        ;
      res.render('profile/index', {profiles: data, filtro: req.query});
    });    
  }else
  {
      res.render('profile/index', {});
  } 
});
//-----------------------------------------------------------------------------

//USERS - VIEW: edit
//-----------------------------------------------------------------------------
router.get('/edit/', function(req, res, next){
  res.render('profile/edit', {});
});

router.get('/edit/:id', function(req, res, next){ 
  profile.get("PROFILE", {_id: req.params.id}, function(erro, data){     
    res.render('profile/edit', {profile: data[0]});
  });  
});

router.post('/edit/:id', function(req, res, next){  
  profile.save("PROFILE", req.body);
  
  profile.get("PROFILE", {_id: req.params.id}, function(erro, data){     
    res.render('profile/edit', {profile: data[0]});
  });      
});
//-----------------------------------------------------------------------------


//PROFILE - VIEW: Delete
//-----------------------------------------------------------------------------
router.get('/delete/:id', function(req, res, next){
  //Deletar profile  
  profile.delete("PROFILE", {_id: req.params.id});

  //recarregar com os filtros
  res.redirect('/profile/');
});
//-----------------------------------------------------------------------------

module.exports = router;