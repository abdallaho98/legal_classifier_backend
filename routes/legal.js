const express = require('express');
const router = express.Router();
const Legal = require('../Models/Legal')
const User = require('../Models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.warn("Herre" , req.query)
    if(req.query.tag == null && req.query.type == null){
        Legal.find({}).populate('answrer').sort('number').then(legals => {res.status(200).send({success : true , legals});}).catch(err => {res.status(400).send({success : false });})
    } else if(req.query.tag != null && req.query.type == null) {
        Legal.find({"content": {"$regex": req.query.tag , "$options": "i" } }).populate('answrer').sort('number').then(legals => {res.status(200).send({success : true , legals});}).catch(err => {res.status(400).send({success : false });})
    } else if(req.query.tag == null && req.query.type != null ){
        Legal.find({ type: req.query.type }).populate('answrer').sort('number').then(legals => {res.status(200).send({success : true , legals});}).catch(err => {res.status(400).send({success : false });})
    }  else{
        Legal.find({"content": {"$regex": req.query.tag , "$options": "i" } , type : req.query.type }).populate('answrer').sort('number').then(legals => {res.status(200).send({success : true , legals});}).catch(err => {res.status(400).send({success : false });})
    }
});


/* GET home page. */
router.post('/answer', function(req, res, next) {
    console.warn("process Answer" , req.body)
    const user = User.findOne({ email: req.body.email }).then(
        user => {
            console.warn(user.email)
            if(user != null)
                Legal.findOneAndUpdate({_id: req.body.id}, {$set: { signaler : 0 ,answer : req.body.answer, answrer: user , tag : req.body.tag}}, (err) => {
                    if (err) {
                        res.status(400).send({success : false })
                    }
                    res.status(200).send({success : true })
                });
        }
    ).catch(err =>  res.status(400).send({success : false }))

});

router.post('/signaler', function(req, res, next) {
    console.warn("process SIGNAL" , req.body)
    Legal.findOneAndUpdate({_id: req.body.id}, {$set: { signaler : 1 , answer: 0 , answrer : null}}, (err) => {
        if (err) {
            res.status(400).send({success : false })
        }
        res.status(200).send({success : true })
    });
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


/* GET home page. */
router.get('/export', function(req, res, next) {
    console.warn("Herre" , req.query)
    if(req.query.tag == null){
        Legal.find({ answer : { $gte : 1} } , {  "_id" : 0  , "__v" : 0 , "number" : 0 , "answrer" : 0}).populate('answrer').then(legals => {res.status(200).send({success : true , legals});}).catch(err => {res.status(400).send({success : false });})
    } else {
        Legal.find({"content": {"$regex": req.query.tag , "$options": "i" } }).populate('answrer').sort('number').then(legals => {res.status(200).send({success : true , legals});}).catch(err => {res.status(400).send({success : false });})
    }
});


router.post('/predict', function(req, res, next) {
    console.warn("process create" , req.body.content)
    const contentText = req.body.content
    let rand = Math.floor((Math.random() * 5) + 1);
    if(contentText.includes("يجب ") || contentText.includes("يلزم ") ){
        rand = 3
    } else if (contentText.includes("يمنع ") || contentText.includes("لا يجوز ") || contentText.includes("لا يمكن ") || contentText.includes("يعافب ") ){
        rand = 4
    } else if (contentText.includes("يحق ")){
        rand = 1
    } else if (contentText.includes("يجوز ") || contentText.includes("يمكن ")){
        rand = 2
    } else {
        rand = 5
    }
    res.status(200).send({success : true , predict : rand})
});

router.get('/type', function(req, res, next) {
    let stats = [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0]
    Legal.find({ answer : { $gte : 1} } ).then(data => {
        data.forEach((element, idx, array) => {
                let emal = element;
                stats[emal.type] += 1
        })
        res.status(200).send({success : true , stats})
    }).catch(err => {res.status(400).send({success : false });})
});

router.get('/class', function(req, res, next) {
    let stats = [0,0,0,0,0,0]
    Legal.find({ answer : { $gte : 1} } ).then(data => {
        data.forEach((element, idx) => {
            let emal = element;
            stats[emal.answer] += 1
        })
        res.status(200).send({success : true , stats})
    }).catch(err => {res.status(400).send({success : false });})
});


module.exports = router;
