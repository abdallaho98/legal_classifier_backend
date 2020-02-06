const express = require('express')
const router = express.Router()
const Predict = require('../Models/Prediction')

/* GET home page. */
router.post('/add', function(req, res, next) {
  console.warn("process create")
  Predict.findOne({ legal: req.body.legal }).then(
      predict => {
        console.warn(predict)
        if(predict != null){
            Predict.findOneAndUpdate({legal: req.body.legal}, {$set: { answer : req.body.answer }}, (err) => {
              if (err) {
                res.status(400).send({success : false })
              }
              res.status(200).send({success : true })
            });
        } else {
          Predict.create(req.body).then(data => {
            res.send({success: true, data});
          }).catch(err => {
            res.status(400).send({success: false, err});
          })
        }
      }
  ).catch(err =>  res.status(400).send({success : false }))
});

router.get('/', function(req, res, next) {
  Predict.find({}).then(data => {res.send({success : true , data});}).catch(err => {res.status(400).send({success : false });})
});


module.exports = router;
