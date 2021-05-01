var mongoose = require('mongoose');

var navigationSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true
    },
    route: {
      type:String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    sub_items: [
        {
            title: {
                type: String,
            },
            level: {
                type: String,
            },
            route: {
                type:String,
            },
            description: {
                type: String,
            }
        }
    ]
  },{timestamps: true});

  var Navigation = module.exports = mongoose.model('navigation', navigationSchema);

  module.exports.get = function (callback, limit) {
    Navigation.find(callback).limit(limit);
}