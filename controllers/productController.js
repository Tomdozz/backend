Product = require('../models/productModel');

function createProduct(articleNumber, label, manufacturer, shortDescription, extendedDescription, mainCat,subCat, imageUrl, inprice, outPrice, tax) {
    var product = new Product({
        uniqueIdentifier: articleNumber + manufacturer,
        articleNumber: articleNumber,
        label: label,
        manufacturer: manufacturer,
        shortDescription: shortDescription,
        extendedDescription: extendedDescription,
        mainCat: mainCat,
        subCat: subCat,
        imageUrl: imageUrl,
        price: {
            inprice: inprice,
            outPrice: outPrice,
            tax: tax
        }
    });
    return product;
}

exports.index = function (req, res) {
    Product.get(function (err, products) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: "Products retrieved successfully",
                data: products
            });
        }
    })
};

exports.new = function (req, res) {
    var product = createProduct(req.body.articleNumber, req.body.label, req.body.manufacturer, req.body.shortDescription, req.body.extendedDescription, req.body.mainCat, req.body.subCat, req.body.imageUrl, req.body.price.inprice, req.body.price.outPrice, req.body.price.tax)
    product.save(function (err) {
        if (err)
            res.json(err);
        else {
            res.json({
                message: 'New Product created!',
                data: product
            });
        }
    })
};

exports.many = function (req, res) {
    var inserted = 0,
        ignored = 0,
        count = 0;

    req.body.forEach(element => {
        count++;
        var product = createProduct(element.articleNumber, element.label, element.manufacturer, element.shortDescription, element.extendedDescription, element.mainCat, element.subCat, element.imageUrl, element.price.inprice, element.price.outPrice, element.price.tax)
        product.save().then(function (product) {
            inserted++;
        }).catch(err => {
            ignored++;
        })
    })
    res.json({
        message: 'Inserted ' + inserted + ": " + 'Ignored ' + ignored + ": " + 'Total product in request was ' + count
    })
    //To-Do: Add better return
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
        product.manufacturer = element.manufacturer;
        product.shortDescription = element.shortDescription;
        product.extendedDescription = element.extendedDescription;
        product.mainCat = element.mainCat;
        product.subCat = element.subCat;
        product.imageUrl = element.imageUrl;

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
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);
        else {
            res.json({
                status: "success",
                message: 'product deleted'
            });
        }
    });
};