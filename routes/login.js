var express = require('express');
var router = express.Router();
var fs = require("fs");

router.use(function(req, res, next){
    if (req.session.uname){
        res.redirect('/')
        return
    }
    next()
})

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
    if (req.body.psw.length < 8){
        res.render('login', {error:"Your password is too short."})
        return
    }

    var users = {}
    if (fs.existsSync("users.json")){
        users = JSON.parse(fs.readFileSync('users.json', "utf-8"))
    }
    if (!users[req.body.uname]){
        res.render('login', {error:"That user doesn't exist."})
        return
    }
    if (users[req.body.uname] != req.body.psw){
        res.render('login', {error:"Invalid password."})
        return
    }
    req.session.uname = req.body.uname;
    res.redirect('/')
  });
module.exports = router;