var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
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
    }
}, {timestamps: true});

var Product = module.exports = mongoose.model('product', productSchema);

module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}