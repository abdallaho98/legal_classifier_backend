const express = require('express');
const router = express.Router();
const Legal = require('../Models/Legal')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.warn("Herre" , req.query)
});


/* GET home page. */
router.post('/add', function(req, res, next) {
    console.warn("process create")
    Legal.create(req.body).then(data => {   res.send(data);}).catch(err => {res.status(400).send(err);})
});

module.exports = router;
