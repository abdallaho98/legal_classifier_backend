const express = require('express');
const router = express.Router();
const User = require('../Models/User')


router.post('/register', function(req, res, next) {
  let user  = req.body
  User.create(user).then(data => {   res.send(data);}).catch(err => {res.status(400).send(err);})
});


router.post('/login', function(req, res, next) {
  User.findOne(
      { email: req.body.email }
  ).then(data => {
    if (data != null)
      res.send({success : true , data});
    else res.send({success : false });
  }).catch(err => {res.status(400).send({success : false });})
});

router.post('/', function(req, res, next) {
  User.find({}).then(data => {res.send({success : true , data});}).catch(err => {res.status(400).send({success : false });})
});

module.exports = router;
