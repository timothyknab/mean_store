// Grab our Mongoose Model:
var Customer = require('mongoose').model('Customer');
var Order = require('mongoose').model('Order');

module.exports = {
    // Create a customer
    create: function(req, res) {
        console.log('Server-side customer controller talking...', req.body);
        Customer.create(req.body)
            .then(function(newCustomer) {
                return res.json(newCustomer);
            })
            .catch(function(err) {
                console.log('Error trying to create customer!', err);
                if (err.errors == null) {
                    console.log('Custom Validator Function Error detected...formatting now and sending to front end:');
                    return res.status(500).json(err.message);
                } else {
                    console.log('Built in Mongoose Validation detected....');
                    return res.status(500).json(err.errors.name.message)
                };
            })
    },
    showAll: function(req, res) {
        console.log('Server-side customer controller talking...showing all customers...');
        Customer.find({})
            .then(function(allCustomers) {
                console.log('All customers found!');
                console.log('%%%%%%%%%%%%%%%%%');
                console.log(allCustomers);
                console.log('%%%%%%%%%%%%%%%%%');
                return res.json(allCustomers);
            })
            .catch(function(err) {
                console.log('Error finding all customers', err);
                return res.status(500).json(err);
            })
    },
    delete: function(req, res) {
        // Cancel any Orders the customer has pending (and return qty back to product inventory):
        Order.find({customer: req.params.id})
            .populate('product')
            .populate('customer')
            .exec()
            .then(function(allCustomerOrders) {
                console.log(allCustomerOrders);
                for (var i = 0; i < allCustomerOrders.length; i++) {
                    allCustomerOrders[i].returnQuantity(allCustomerOrders[i].product._id, allCustomerOrders[i].quantity);
                    allCustomerOrders[i].deleteOrder(allCustomerOrders[i]._id)
                }
                Customer.remove({_id: req.params.id})
                    .then(function() {
                        return res.json('User and order deleted, product inventory returned! Delete success!');
                    })
                    .catch(function(err) {
                        console.log(err);
                        return res.status(500).json(err);
                    })
                })
            .catch(function(err) {
                console.log(err);
                return res.status(500).json(err);
            })
    },
};
