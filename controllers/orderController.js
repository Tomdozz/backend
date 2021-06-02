Order = require('../models/orderModel')

function createOrder(user_id, price, orderItems){
    
}

exports.index = function (req, res) {
    Order.get(function (err, orders) {
        if (err){
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: "Products retrieved successfully",
                data: orders
            });
        }
    })
};

exports.new = function (req, res) {
   var order = createOrder();
};

exports.view = function (req, res) {

};

exports.update = function (req, res) {

};

exports.delete = function (req, res) {

};