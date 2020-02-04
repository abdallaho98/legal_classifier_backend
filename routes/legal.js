const express = require('express');
const router = express.Router();
const Legal = require('../Models/Legal')
const User = require('../Models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.warn("Herre" , req.query)
    if(req.query.tag == null){
        Legal.find({}).populate('answrer').then(legals => {res.status(200).send({success : true , legals});}).catch(err => {res.status(400).send({success : false });})
    } else {
        Legal.find({"content": {"$regex": req.query.tag , "$options": "i" } }).populate('answrer').then(legals => {res.status(200).send({success : true , legals});}).catch(err => {res.status(400).send({success : false });})
    }
});


/* GET home page. */
router.post('/answer', function(req, res, next) {
    console.warn("process Answer" , req.body)
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


router.post('/addall', function(req, res, next) {
    console.warn("process create" , req.body)
    Legal.insertMany(req.body.csv).then(data => {   res.send({success : true  , data});}).catch(err => {res.status(400).send({success : false  , err});})
});

module.exports = router;
