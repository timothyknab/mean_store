// Setup dependencies:
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Setup a schema:
var OrderSchema = new Schema (
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity required.'],
        }, // end quantity field
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
    },
    {
        timestamps: true,
    }
);

/**********************/
/*  INSTANCE METHODS  */
/**********************/

// Decrease Product Quantity:
OrderSchema.methods.decreaseQuantity = function(productID, quantity) {
    var Product = require('mongoose').model('Product');

    Product.find({_id: productID})
        .then(function(foundProduct) {
            console.log(foundProduct[0].quantity);
            if (foundProduct[0].quantity - quantity < 0) {
                console.log('The stock on this product is too low for your order.');
                var err = new Error('The stock on this product is too low for your order.');
                return false;
            } else {
                foundProduct[0].quantity -= quantity;
                console.log('SAVING');
                foundProduct[0].save();
                console.log(foundProduct[0]);
                return true;
            }
        })
        .catch(function(err) {
            console.log(err)
            return false;
        })
};

// Return Product Quantity if Order Deleted:
OrderSchema.methods.returnQuantity = function(productID, quantity) {
    var Product = require('mongoose').model('Product');

    Product.find({_id: productID})
        .then(function(foundProduct) {
            console.log(foundProduct[0].quantity);
            foundProduct[0].quantity += quantity;
            foundProduct[0].save();
            return true;
        })
        .catch(function(err) {
            console.log(err)
            return false;
        })
};

// Delete Order based on order ID:
OrderSchema.methods.deleteOrder = function(orderID) {
    Order.remove({_id: orderID})
        .then(function() {
            console.log('Order removed!');
            return true;
        })
        .catch(function(err) {
            console.log(err)
            return false;
        })
};



/***************************/
/*  CREATE MODEL & EXPORT  */
/***************************/

// Instantiate Mongoose Model:
var Order = mongoose.model('Order', OrderSchema);

// Export Model:
module.exports = Order;
