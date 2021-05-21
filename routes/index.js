var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { username: req.session.uname });
});

router.get('/logout', function(req, res, next){
  req.session.uname = undefined
  res.redirect('/')
})

module.exports = router;
