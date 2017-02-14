// Grab our Mongoose Model:
var Product = require('mongoose').model('Product');

module.exports = {
    // Create a product
    create: function(req, res) {
        console.log('Server-side product controller talking...', req.body);
        Product.create(req.body)
            .then(function(newProduct) {
                return res.json(newProduct);
            })
            .catch(function(err) {
                console.log('Error trying to create product!', err);
                if (err.errors == null) {
                    console.log('Custom Validator Function Error detected...formatting now and sending to front end:');
                    return res.status(500).json({name: {message: err.message}});
                } else {
                    console.log('Built in Mongoose Validation detected....');
                    return res.status(500).json(err.errors)
                };
            })
    },
    showAll: function(req, res) {
        console.log('Server-side product controller talking...showing all products...');
        Product.find({})
            .then(function(allProducts) {
                console.log('All products found!');
                console.log('%%%%%%%%%%%%%%%%%');
                console.log(allProducts);
                console.log('%%%%%%%%%%%%%%%%%');
                return res.json(allProducts);
            })
            .catch(function(err) {
                console.log('Error finding all products', err);
                return res.status(500).json(err);
            })
    },
    delete: function(req, res) {
        Product.remove({_id: req.params.id})
            .then(function() {
                return res.json('Delete Success!');
            })
            .catch(function(err) {
                console.log(err);
                return res.status(500).json(err);
            })
    },
};
