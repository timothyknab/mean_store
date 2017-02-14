// Load Controllers:
var CustomerController = require('./../controllers/customer-controller');

// Server-Side Routes:
module.exports = function(app) {
    console.log('Server side routes loaded...');
    app.post('/customers', CustomerController.create)
        .get('/customers', CustomerController.showAll)
        .delete('/customers/:id', CustomerController.delete)
};
