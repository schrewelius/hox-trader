var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var tradeSchema = new Schema({
  order: {type: ObjectId, required: true},
  user: {type: ObjectId, required: true},
  counterparty: {type: ObjectId, required: true},
  instrument: {type: ObjectId, required: true},
  side: {type: String, enum: ['BUY', 'SELL'], required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true},
  createTimestamp: Date,
  updateTimestamp: Date
});

tradeSchema.pre('save', function(next) {
  var currentDate = new Date();
  if (this.isNew) {
    this.createTimestamp = currentDate;
  }
  this.updateTimestamp = currentDate;
  next();
});

module.exports = mongoose.model('Trade', tradeSchema);
