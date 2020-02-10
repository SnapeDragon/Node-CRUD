var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  name: String
},{collection: 'NameList'});

var UserData = mongoose.model('NameList', userDataSchema)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/insert', function(req, res, next){
  var nm = req.body.name;
  var newdoc = {
    name: nm
  };
  var data = new UserData(newdoc);
  data.save();
  // res.redirect('/');
  res.send({name: nm});
});

router.get('/names',function(req, res, next){
  UserData.find()
  .then(function(doc){
    res.render('names',{items: doc});
  });
});

router.post('/update', function(req, res, next){
  var id =  req.body.id;
  console.log(id + ' ' + req.body.newname);
  UserData.findById(id, function(err, doc){
    if(err){
      console.log('Error no entry found');
    }
    doc.name = req.body.newname;
    doc.save();
  });
  // res.redirect('/names');
  // res.send({newname: req.body.newname});
  UserData.find()
  .then(function(doc){
    res.send({updatedItem: doc, newname: req.body.newname});
  });
  
});

router.get('/delete/:id', function(req, res, next){
  var id = req.params.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/names');
});
module.exports = router;
