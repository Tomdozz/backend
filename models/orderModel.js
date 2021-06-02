var mongoose = require('mongoose');
var Price = require('./priceModel');
var orderItem = require('./orderItem');

var orderSchema = new mongoose.Schema({
    orderNumber:{
        type: Number,
        unique: true
    },
    urser_id: {
        type: String,
        require: true
    },
    price: Price,
    orderItems: [orderItem]
})

var Order = module.exports = mongoose.model('order', orderSchema);

module.exports.get = function (callback, limit) {
    Order.find(callback).limit(limit);
}