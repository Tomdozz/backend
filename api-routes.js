let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to lifearray backend crafted with love!'
    });
});

var contactController = require('./controllers/contactController');
var navigationController = require('./controllers/navigationController');
var userController = require('./controllers/userController');
var productController = require('./controllers/productController');


router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

router.route('/navigation')
    .get(navigationController.index)
    .post(navigationController.new)
    .put(navigationController.many);
router.route('/navigation/:navigation_id')
    .get(navigationController.view)
    .patch(navigationController.update)
    .put(navigationController.update)
    .delete(navigationController.delete);

router.route('/users')
    .get(userController.index)
    .post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);
router.route('/users/login')
    .post(userController.login)

router.route('/products')
    .get(productController.index)
    .post(productController.new)
    .put(productController.many);
router.route('/products/:product_id')
    .get(productController.view)
    .patch(productController.update)
    .put(productController.update)
    .delete(productController.delete);


// Export API routes
module.exports = router;