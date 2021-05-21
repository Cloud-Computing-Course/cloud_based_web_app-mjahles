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
  res.render('register');
});

router.post('/', function(req, res, next) {
    if (req.body.psw.length < 8){
        res.render('register', {error:"Your password is too short."})
        return
    }

    var users = {}
    if (fs.existsSync("users.json")){
        users = JSON.parse(fs.readFileSync('users.json', "utf-8"))
        if (users[req.body.uname]){
            res.render('register', {error:"That user already exists."})
            return
        }
    }
    users[req.body.uname] = req.body.psw;
    fs.writeFileSync('users.json', JSON.stringify(users))
    req.session.uname = req.body.uname;
    res.redirect('/')
  });
module.exports = router;