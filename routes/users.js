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
  ).then(data => {   res.send(data);}).catch(err => {res.status(400).send(err);})
});

module.exports = router;
