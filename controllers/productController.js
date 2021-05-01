Product = require('./../models/ProductModel');


exports.index = function (req, res) {
    Product.get(function (err, products) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Products retrieved successfully",
            data: products
        });

    })
};

exports.new = function (req, res) {
    var product = new Product();
    product.uniqueIdentifier = req.body.articleNumber + req.body.manufacturer
    product.articleNumber = req.body.articleNumber;
    product.label = req.body.label;
    product.manufacturer = req.body.shortDescription;
    product.extendedDescription = req.body.extendedDescription;
    product.mainCat = req.body.mainCat;
    product.subCat = req.body.subCat;

    product.save(function (err) {
        if (err)
            res.json(err);
        else {
            res.json({
                message: 'New Product created!',
                data: contact
            });
        }
    })
};

exports.new = function (req, res) {
    req.body.forEach(element => {
        var product = new Product();
        product.uniqueIdentifier = element.articleNumber + element.manufacturer
        product.articleNumber = element.articleNumber;
        product.label = element.label;
        product.manufacturer = element.shortDescription;
        product.extendedDescription = element.extendedDescription;
        product.mainCat = element.mainCat;
        product.subCat = element.subCat;

        product.save(function (err) {
            if (err)
                res.status(400).json(err); //To-Do: might wan to just save the products that failed and continue the rest
        })
    });
    //To-Do: Add better return
    res.json({message: 'insert many'})
};

exports.view = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            message: 'Product details loading..',
            data: product
        });
    });
};

exports.update = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.status(400).send(err);
        product.uniqueIdentifier = element.articleNumber + element.manufacturer
        product.articleNumber = element.articleNumber;
        product.label = element.label;
        product.manufacturer = element.shortDescription;
        product.extendedDescription = element.extendedDescription;
        product.mainCat = element.mainCat;
        product.subCat = element.subCat;

        product.save(function (err) {
            if (err)
                res.json(err);
            else {
                res.json({
                    message: 'New product updated!',
                    data: product
                });
            }
        })
    });
};

exports.delete = function (req, res) {
    Product.remove({_id: req.params.product_id}, function (err, product) {
        if (err)
            res.send(err);
        else{
            res.json({
            status: "success",
            message: 'product deleted'});
        }
    });
};