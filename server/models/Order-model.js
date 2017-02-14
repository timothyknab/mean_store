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

// Push Customer ID:
OrderSchema.methods.pushCustomer = function(id) {
    this.customer = id;
    this.save();
    return true;
};

// Push Product ID:
OrderSchema.methods.pushProduct = function(id) {
    this.product = id;
    this.save();
    return true;
};

/***************************/
/*  CREATE MODEL & EXPORT  */
/***************************/

// Instantiate Mongoose Model:
var Order = mongoose.model('Order', OrderSchema);

// Export Model:
module.exports = Order;
