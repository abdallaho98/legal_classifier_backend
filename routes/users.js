const express = require('express');
const router = express.Router();
const User = require('../Models/User')
const Legal = require('../Models/Legal')


router.post('/register', function(req, res, next) {
  let user  = req.body
  User.findOne({ email : req.body.email }).then(data => {
    if(data == null){
      User.create(user).then(data => {   res.send(data);}).catch(err => {res.status(400).send(err);})
    } else {
      res.status(200).send({success : false , message : 'exist déja'})
    }
  }).catch(err => {
    {res.status(400).send(err);}
  })
})


router.post('/login', function(req, res, next) {
  User.findOne(
      { email: req.body.email }
  ).then(data => {
    if (data != null)
      res.send({success : true , data});
    else res.send({success : false });
  }).catch(err => {res.status(400).send({success : false });})
});

router.get('/', function(req, res, next) {
  User.find({}).then(data => {res.send({success : true , data});}).catch(err => {res.status(400).send({success : false });})
});


router.get('/statistics', function (req,res,next) {
  let stats = []
  User.find({}).then(data => {
    data.forEach((element, idx, array) => {
          let emal = element;
          Legal.find({ answrer : emal._id }).then( arr => {
            stats.push({
              email : emal.email, nb : arr.length
            })
            if( idx == array.length - 1) res.status(200).send({stats})
          }).catch(err => {res.status(400).send({success : false });})
       }
    )
  }).catch(err => {res.status(400).send({success : false });})
})



module.exports = router;
