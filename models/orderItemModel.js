var mongoose = require('mongoose');
var Price = require('./priceModel');

var orderItemSchema = mongoose.Schema({
    articleNumber: {
        type: String,
        require: true
    },
    label: {
        type: String,
        require: true
    },
    manufacturer: {
        type: String,
        require: true
    },
    price: Price
})

module.exports = orderItemSchema;