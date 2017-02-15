// Setup dependencies:
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Setup a schema:
var ProductSchema = new Schema (
    {
        name: {
            type: String,
            minlength: [2, 'Product name must be at least 2 characters.'],
            maxlength: [20, 'Product name must be less than 20 characters.'],
            required: [true, 'Product name cannot be blank.'],
            trim: true,
            unique: true, // name must be unique
            dropDups: true,
        }, // end name field
        image: {
            type: String,
            minlength: [2, 'Image URL must be at least 2 characters.'],
            maxlength: [100, 'Image URL must be less than 100 characters.'],
            required: [true, 'Image URL cannot be blank.'],
            trim: true,
        }, // end image field
        description: {
            type: String,
            minlength: [2, 'Product description must be at least 2 characters.'],
            maxlength: [1500, 'Product description must be less than 1500 characters.'],
            required: [true, 'Product description cannot be blank.'],
            trim: true,
            unique: true, // description must be unique
            dropDups: true,
        }, // end description field
        quantity: {
            type: Number,
            max: [500, 'Product quantity must be no greater than 500 items.'],
            required: [true, 'Product quantity required.'],
        }, // end quantity field
    },
    {
        timestamps: true,
    }
);

/**********************/
/*  INSTANCE METHODS  */
/**********************/

// RegEx Validation (Alphanumerical and Underscores Only):
ProductSchema.methods.validateUsername = function(name) {
    console.log('Product Name Creation Validation...Assessing for alphanumer characters and underscores...');
    var regex = /^[a-z0-9_ ]+$/i;
    return regex.test(name);
    /*

        Note: These validation above and below only run on the name field for the product.
        You could enhance your validations here and in your pre save hook if you
        wished for more of your fields to be validated as well.

    */
};

// Case insensitive query validation instance method:
ProductSchema.methods.checkDuplicates = function(name, next) {
    console.log('Product Name Duplicate Validation...case insensitive querying mongo for duplicates...');
    /*
        The time evaluations below are so that when a product's quantity is being updated,
        the duplicate check validaton doesn't get flagged. You could remove this checking,
        but then duplicate product names could be created. The log below evaluates the timestamp
        of a product before updating it. If the timestamp is greater than 5 seconds old, the validations
        bypass the duplicate title check (as there is no way to edit a title once created) and update
        the product quantity. Note that, if product title edit functionality was implemented, the below
        validations would have to be refactored.
    */
    var created = this.createdAt.getTime();
    var now = new Date().getTime();
    console.log(created, now);
    console.log(now - created);
    // This area may be need to be updated if product title editing functionality was implemented:
    if (now - created >= 5000) {
        console.log('This is not a new product creation and is older than 5 seconds, skipping duplicate check so properties can be updated...');
        next();
    } else {
        Product.findOne({name: { $regex : new RegExp("^" + name + "$", "i")}})
        .then(function(foundProduct) {
            if(foundProduct) { // if user is found, the following error is generated and sent to client (phase 1 passed but phase 2 failed):
                console.log('Product Name Creation Validation ERROR...existing product has been found...validation failed...', foundProduct);
                var err = new Error('Product already exists.');
                next(err);
            }
            if(!foundProduct) { // if user is not found, then user can proceed to be created
                console.log('Product Name Creation Validation PASSED...no existing entries found...');
                next();
            }
        })
        .catch(function(err) { // if our regex query goes awry this will catch any errors:
            console.log('Error performing case insensitive query to MongoDB...', err);
            next(err);
        })
    }
};

/*************************/
/*  PRE SAVE MIDDLEWARE  */
/*************************/

// Pre Save Hook:
ProductSchema.pre('save', function(next) {
    var self = this;

    // Alphanumer and underscore Regex Validation:
    if (self.validateUsername(this.name)) { // if phase 1 validation returns as true, check for duplicates (phase 2)
        console.log('Product Name Creation Validation PASSED basic alphanum + underscore validation...');
        // Duplicate Check via Case Insensitive Mongoose Query:
        self.checkDuplicates(this.name, next);
    } else {
        console.log('Product Name Creation Validation ERROR...');
        var err = new Error('Product Name may contain only letters, numbers, spaces and underscores.');
        console.log(err);
        next(err);
    };
});

/***************************/
/*  CREATE MODEL & EXPORT  */
/***************************/

// Instantiate Mongoose Model:
var Product = mongoose.model('Product', ProductSchema);

// Export Model:
module.exports = Product;
