var express = require('express');
var router = express.Router();
var Trade = require('../models/trade');

router.get('/', function(req, res){
  var query = {};
  if (!req.auth.user.role.isAdmin) {
    query.user = req.auth.user._id;
  }
  Trade.find(query)
  .populate('order')
  .populate('user')
  .populate('instrument')
  .populate({
    path: 'counterpartyTrade',
    select: 'user',
    populate: {path: 'user', select: 'name email phone'}
  })
  .exec(function(err, trades) {
    if (err) {
      res.status(500).json({'error': err});
    } else {
      res.json(trades);
    }
  });
});

router.get('/:id', function(req, res){
  var query = {_id: req.params.id};
  if (!req.auth.user.role.isAdmin) {
    query.user = req.auth.user._id;
  }
  Trade.findOne(query)
  .populate('order')
  .populate('user')
  .populate('instrument')
  .populate({
    path: 'counterpartyTrade',
    select: 'user',
    populate: {path: 'user', select: 'name email phone'}
  })
  .exec(function(err, trade) {
    if (err) {
      res.status(500).json({'error': err})
    } else if (trade) {
      res.json(trade);
    } else {
      res.status(404).send();  // No order found
    }
  });
});

module.exports = router
