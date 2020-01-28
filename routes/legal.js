const express = require('express');
const router = express.Router();
const Legal = require('../Models/Legal')
const User = require('../Models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.warn("Herre" , req.query)
    Legal.find({}).populate('answrer').then(legals => {res.send({success : true , legals});}).catch(err => {res.status(400).send({success : false });})
});


/* GET home page. */
router.post('/answer', function(req, res, next) {
    console.warn("process Answer")
    const user = User.findOne({ email: req.body.email }).then(
        user => {
            console.warn(user.email)
            if(user != null)
                Legal.findOneAndUpdate({_id: req.body.id}, {$set: { answer : req.body.answer, answrer: user }}, (err) => {
                    if (err) {
                        res.status(400).send({success : false })
                    }
                    res.status(200).send({success : true })
                });
        }
    ).catch(err =>  res.status(400).send({success : false }))

});


/* GET home page. */
router.post('/add', function(req, res, next) {
    console.warn("process create")
    Legal.create(req.body).then(data => {   res.send({success : true  , data});}).catch(err => {res.status(400).send({success : false  , err});})
});

module.exports = router;
