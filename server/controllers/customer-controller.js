// Grab our Mongoose Model:
var Customer = require('mongoose').model('Customer');

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
        console.log('Server-side user controller talking...showing all customers...');
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
        Customer.remove({_id: req.params.id})
            .then(function() {
                return res.json('Delete Success!');
            })
            .catch(function(err) {
                console.log(err);
                return res.status(500).json(err);
            })
    },
};
