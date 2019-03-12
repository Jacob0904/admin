var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userName){
    res.render('index', { title: 'Express' });
  }else{
    res.render('error', { title: 'Express' });
  }

});

module.exports = router;
