var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  name: String
},{collection: 'MyCollection'});

var UserData = mongoose.model('MyCollection', userDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',condition: true, array: [0,1,2] });
});

router.get('/get-data', function(req, res, next){
  UserData.find().then(function(doc){
    res.render('index',{items: doc, gflag: true});
  });
});

router.post('/insert', function(req, res, next){
 
  var item = {
    name: req.body.nm
  };
  var data = new UserData(item);
  data.save();
  // res.render('index');
  res.redirect('/');
});

router.get('/delete/:id', function(req, res, next){
  var id = req.params.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/get-data');
  
});

router.post('/update', function(req,res,next){
  var id = req.body.id;
  console.log(id);
  UserData.findById(id, function(err, doc){
    if(err){
      console.log('Error no entry found');
    }
    doc.name = req.body.newname; 
    doc.save();
  });
  res.redirect('/get-data');
});

module.exports = router;
