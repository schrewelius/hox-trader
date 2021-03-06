var express = require('express');
var router = express.Router();
var Instrument = require('../models/instrument');
var Order = require('../models/order');
var OrderDepth = require('../models/orderdepth');

router.get('/', function(req, res) {
  var orderDepths = {};
  Instrument.find({})
    .then(instruments => {
      instruments.forEach(function(instrument) {
        orderDepths[instrument._id] = new OrderDepth(instrument);
      });
      return Order.find({status: 'ACTIVE'});
    })
    .then(orders => {
      orders.forEach(function(order) {
        orderDepths[order.instrument].addOrder(order);
      });
      res.json(Object.keys(orderDepths).map(function(key) { return orderDepths[key]; })); // Convert map to array
    })
    .catch(err => {
      res.status(500).json({ error : err });
    });
});

module.exports = router
