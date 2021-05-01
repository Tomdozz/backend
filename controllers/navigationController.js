Navigation = require('./../models/navigationModel');

exports.index = function (req, res) {
    Navigation.get(function (err, navigationTree) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
        status: "success",
            message: "Navigation tree retrieved successfully",
            data: navigationTree
        });
    });
};

exports.new = function (req, res) {
    var navigation = new Navigation();
    navigation.title = req.body.title;
    navigation.level = req.body.level;
    navigation.route = req.body.route;
    navigation.description = req.body.description;
    
    navigation.save(function (err) {
        if (err)
            res.json(err);
        else{
            res.json({
                message: 'New naventry created!',
                data: navigation
            });
        }
    });
};

exports.many = function (req, res) {
    // console.log(req.body.length);
    req.body.forEach(element => {
        var navigation = new Navigation()
        //navigation = element;
        navigation.title = element.title
        navigation.level = element.level
        navigation.route = element.route
        navigation.description = element.description
        navigation.sub_items = element.sub_items
        navigation.save(function (err) {
            if(err){
                res.status(400).json(err)
            }
        })
        console.log(navigation);
        console.log('element is '+ element);
    });
    //To-Do: Add better return
    res.json({message: 'insert many'})
}

exports.view = function (req, res) {
    Navigation.findById(req.params.navigation_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Navigation details loading..',
            data: contact
        });
    });
};

exports.update = function (req, res) {
    Navigation.findById(req.params.navigation_id, function (err, navigation) {
            if (err)
                res.send(err);
            navigation.title = req.body.title;
            navigation.level = req.body.level;
            navigation.route = req.body.route;
            navigation.description = req.body.description;
            // save the contact and check for errors
            contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Nav entry Info updated',
                data: navigation
            });
        });
    });
};

exports.delete = function (req, res) {
    Navigation.remove({
        _id: req.params.navigation_id
    }, function (err, navEntry) {
        if (err)
            res.send(err);
            res.json({
            status: "success",
            message: 'navEntry deleted'
        });
    });
};