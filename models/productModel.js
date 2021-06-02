var mongoose = require('mongoose');
var Price = require('./priceModel');


var productSchema = new mongoose.Schema({
    uniqueIdentifier: {
        type: String,
        require: true,
        unique: true
    },
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
    shortDescription: {
        type: String,
    }, 
    extendedDescription: {
        type: String,
    }, 
    mainCat: {
        type: String,
        require: true
    },
    subCat: {
        type: String,
        require: true
    },
    imageUrl:{
        type: String,
    },
    price: Price
}, {timestamps: true});

var Product = module.exports = mongoose.model('product', productSchema);

module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}