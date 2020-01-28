const express = require('express');
const router = express.Router();
const User = require('../Models/User')


router.post('/register', function(req, res, next) {
  let user  = req.body
  user.verfied = false
  const pass = Math.floor(100000 + Math.random() * 900000)
  user.password = pass
  //twilio code confirmation
  client.messages.create({
    from: '+18704692444',
    to:    '+213'+user.phone,
    body: "Code is " + pass
  }).then((messsage) => console.log(message.sid));
  User.create(user).then(data => {   res.send(data);}).catch(err => {res.status(400).send(err);})
});

//twilio confirm
router.post('/password' , function (req,res ,next) {
    User.updateOne({nss:req.body.nss}, {$set: {password:req.body.password , verfied : true} }).then(data => { res.send({success : true});}).catch(err => {res.status(400).send({success : false});})
})

router.post('/login', function(req, res, next) {
  User.findOne(
      { phone: req.body.phone , password : req.body.password }
  ).then(data => {   res.send(data);}).catch(err => {res.status(400).send(err);})
});

module.exports = router;
