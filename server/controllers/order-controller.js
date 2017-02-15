// Grab our Mongoose Model:
var Order = require('mongoose').model('Order');

module.exports = {
    // Create an order
    create: function(req, res) {
        console.log('Server-side order controller talking...', req.body);
        Order.create(req.body)
            .then(function(newOrder) {
                // do your instance method stuff here
                console.log('Adjust quantity now...');
                console.log(newOrder.decreaseQuantity(req.body.product, req.body.quantity))
                return res.json(newOrder);
            })
            .catch(function(err) {
                console.log('Error trying to create order!', err);
                if (err.errors == null) {
                    console.log('Custom Validator Function Error detected...formatting now and sending to front end:');
                    return res.status(500).json(err.message);
                } else {
                    console.log('Built in Mongoose Validation detected....');
                    return res.status(500).json(err.errors.name.message)
                };
            })
    },
    showOrders: function(req, res) {
        console.log('Server-side order controller talking...showing all orders...');
        Order.find({})
            .populate('customer')
            .populate('product')
            .exec()
            .then(function(fullOrder) {
                return res.json(fullOrder);
            })
            .catch(function(err) {
                console.log(err);
                return res.status(500).json(err);
            })

    },
};
