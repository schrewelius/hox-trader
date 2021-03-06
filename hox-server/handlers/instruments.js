var express = require('express');
var router = express.Router();
var Instrument = require('../models/instrument');

router.get('/', function(req, res){
  Instrument.find({}, function(err, instruments) {
    if (err) {
      res.status(500).json({'error': err})
    } else {
      res.json(instruments);
    }
  });
});

router.post('/', function(req, res){
  var instrument = new Instrument({
    underlying: req.body.underlying,
    expiry: req.body.expiry
  });
  instrument.save(function(err) {
    if (err) {
      res.status(500).json({'error': err})
    } else {
      res.json(instrument);
    }
  });
});

router.get('/:id', function(req, res){
  Instrument.findById(req.params.id, function(err, instrument) {
    if (err) {
      res.status(500).json({'error': err})
    } else if (instrument) {
      res.json(instrument);
    }  else {
      res.status(404).send();  // No instrument found
    }
  });
});

module.exports = router
