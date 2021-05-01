var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    credLevel:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    userName:{
        type: String,
        require: true    
    }
}, {timestamps: true});

var User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}