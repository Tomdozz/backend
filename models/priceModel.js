var mongoose = require('mongoose');

var priceSchema = mongoose.Schema({
    inprice: {
        type: Number, min: 0, max: 1000000
    },
    outPrice: {
        type: Number, min: 0, max: 1000000
    },
    tax: {
        type: Number, min: 0, max: 1000000
    }
})

module.exports = priceSchema;

// var Price = mongoose.model('price', priceSchema);
// module.exports.get = function (callback, limit) {
//     Price.find(callback).limit(limit);
// }