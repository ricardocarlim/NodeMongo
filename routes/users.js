var express = require('express');
var router = express.Router();
var users = require("../services/users.js");
var profile = require("../services/profile.js");
var ObjectID = require('mongodb').ObjectID;

//USERS - VIEW: new
//-----------------------------------------------------------------------------
router.get('/new', function(req, res, next){    
  
  profile.get("PROFILE", {}, function(erro, data){            
    res.render('users/new', {profiles: data});      
  });      
});

router.post('/new', function(req, res, next){  
  //console.log(req.body);
  console.log(new ObjectID(req.body.profile_id));  
  var profile_id = new ObjectID(req.body.profile_id);  
  var req2 = req.body;
  req2.profile_id = profile_id;

  users.save("USERS", req2);

  res.redirect('./');
});

//-----------------------------------------------------------------------------

//USERS - VIEW: edit
//-----------------------------------------------------------------------------
router.get('/edit/', function(req, res, next){
   profile.get("PROFILE", {}, function(erro, data){            
      res.render('users/edit', {users: data[0], profiles: profile});
    });
});

router.get('/edit/:id', function(req, res, next){ 
 
  users.get("USERS", {_id: req.params.id}, function(erro, data){     
    var datapost = data[0];
    datapost.profile_id = data[0].profile_id.toString();

    profile.get("PROFILE", {}, function(erroprof, dataprof){          
      var dataprof2 = dataprof;

      dataprof2.forEach(function(element) {        
        element._id = element._id.toString();
        element.profile_id = datapost.profile_id.toString();
        console.log(element._id == datapost.profile_id);
      }, this);       
      res.render('users/edit', {profiles: dataprof2, users: datapost});
    });
  
  });  
});

router.post('/edit/:id', function(req, res, next){ 
  var profile_id = new ObjectID(req.body.profile_id);  
  var req2 = req.body;
  req2.profile_id = profile_id;

  users.save("USERS", req2);
  
  users.get("USERS", {_id: req.params.id}, function(erro, data){   
    var datapost = data[0];
    datapost.profile_id = data[0].profile_id.toString();

    profile.get("PROFILE", {}, function(erroprof, dataprof){ 
      var dataprof2 = dataprof;

      dataprof2.forEach(function(element) {        
        element._id = element._id.toString();
        element.profile_id = datapost.profile_id.toString();
        console.log(element._id == element.profile_id);
      }, this);       
      res.render('users/edit', {users: datapost, profiles: dataprof2});
    });
    
  });      
});
//-----------------------------------------------------------------------------

//USERS - VIEW: index
//-----------------------------------------------------------------------------
router.get('/', function(req, res, next){  
  var searchExpression = {};
  
  if(req.query.Name != undefined){ 
    console.log(req.query);   
    console.log(req.query.Name);
    console.log(req.query.Birth);
    console.log(req.query.Document);

    searchExpression = {$and: [{Name: {$regex: req.query.Name}}, {Birth: {$regex: req.query.Birth}}, {Document: {$regex: req.query.Document}}] };
    
    users.get("USERS", searchExpression, function(erro, data){            
      res.render('users/index', {users: data, filtro: req.query});
    });    
  }else
  {
      res.render('users/index', {});
  } 
});
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

//USERS - VIEW: Delete
//-----------------------------------------------------------------------------
router.get('/delete/:id', function(req, res, next){
  //Deletar usuário
  console.log(req.query);
  console.log(req.body);
  users.delete("USERS", {_id: req.params.id});

  //recarregar com os filtros
  res.redirect('/users/');
});
//-----------------------------------------------------------------------------

module.exports = router;