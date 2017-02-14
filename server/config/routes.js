// Load Controllers:
var CustomerController = require('./../controllers/customer-controller');
var DashboardController = require('./../controllers/dashboard-controller');
var ProductController = require('./../controllers/product-controller');
var OrderController = require('./../controllers/order-controller');

// Server-Side Routes:
module.exports = function(app) {
    console.log('Server side routes loaded...');
    app.post('/customers', CustomerController.create)
        .get('/customers', CustomerController.showAll)
        .delete('/customers/:id', CustomerController.delete)
        .get('/dashboard/customers', DashboardController.showCustomers)
        .get('/dashboard/products', DashboardController.showProducts)
        .get('/dashboard/orders', DashboardController.showOrders)
        .post('/products', ProductController.create)
        .get('/products', ProductController.showAll)
        .post('/orders', OrderController.create)
        .get('/orders', OrderController.showOrders)
};
