// Grab our Mongoose Model:
var Customer = require('mongoose').model('Customer');
var Product = require('mongoose').model('Product');
var Order = require('mongoose').model('Order');

module.exports = {

    // Get Latest 3 Customers:
    showCustomers : function(req, res) {
        Customer.find({}).sort({_id: -1}).limit(3)
            .then(function(latestCustomers) {
                console.log('Latest customers found:', latestCustomers);
                res.json(latestCustomers);
            })
            .catch(function(err) {
                console.log('Error getting latest customers:', err);
                res.status(500).json(err);
            })
    },
    // Get Latest 5 Products:
    showProducts : function(req, res) {
        Product.find({}).sort({_id: -1}).limit(5)
            .then(function(latestProducts) {
                console.log('Latest products found:', latestProducts);
                res.json(latestProducts);
            })
            .catch(function(err) {
                console.log('Error getting latest products on server controller:', err);
                res.status(500).json(err);
            })
    },
    // Get Latest 3 Orders:
    showOrders : function(req, res) {
        Order.find({})
            .sort({_id: -1})
            .limit(3)
            .populate('customer')
            .populate('product')
            .exec()
            .then(function(latestOrders) {
                console.log('Latest orders found:', latestOrders);
                res.json(latestOrders);
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).json(err);
            })
    },

};
