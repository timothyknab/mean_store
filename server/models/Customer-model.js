// Setup dependencies:
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Setup a schema:
var CustomerSchema = new Schema (
    {
        name: {
            type: String,
            minlength: [2, 'Name must be at least 2 characters.'],
            maxlength: [20, 'Name must be less than 20 characters.'],
            required: [true, 'Your name cannot be blank.'],
            trim: true,
            unique: true, // name must be unique
            dropDups: true,
        }, // end name field
        orders: [{
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }],
    },
    {
        timestamps: true,
    }
);

/**********************/
/*  INSTANCE METHODS  */
/**********************/

// RegEx Validation (Alphanumerical and Underscores Only):
CustomerSchema.methods.validateUsername = function(name) {
    console.log('Name Creation Validation...Assessing for alphanumer characters and underscores...');
    var regex = /^[a-z0-9_ ]+$/i;
    return regex.test(name);
};

// Case insensitive query validation instance method:
CustomerSchema.methods.checkDuplicates = function(name, next) {
    console.log('Name Duplicate Validation...case insensitive querying mongo for duplicates...');
    Customer.findOne({name: { $regex : new RegExp("^" + name + "$", "i")}})
        .then(function(foundCustomer) {
            if(foundCustomer) { // if user is found, the following error is generated and sent to client (phase 1 passed but phase 2 failed):
                console.log('Name Creation Validation ERROR...existing user has been found...validation failed...', foundCustomer);
                var err = new Error('Name already exists.');
                next(err);
            }
            if(!foundCustomer) { // if user is not found, then user can proceed to be created
                console.log('Name Creation Validation PASSED...no existing entries found...');
                next();
            }
        })
        .catch(function(err) { // if our regex query goes awry this will catch any errors:
            console.log('Error performing case insensitive query to MongoDB...', err);
            next(err);
        })
};

/*************************/
/*  PRE SAVE MIDDLEWARE  */
/*************************/

// Pre Save Hook:
CustomerSchema.pre('save', function(next) {
    var self = this;

    console.log('TESTING PRE SAVE');
    // Alphanumer and underscore Regex Validation:
    if (self.validateUsername(this.name)) { // if phase 1 validation returns as true, check for duplicates (phase 2)
        console.log('Name Creation Validation PASSED basic alphanum + underscore validation...');
        // Duplicate Check via Case Insensitive Mongoose Query:
        self.checkDuplicates(this.name, next);
    } else {
        console.log('Name Creation Validation ERROR...');
        var err = new Error('Name may contain only letters, numbers, spaces and underscores.');
        console.log(err);
        next(err);
    };
});

/***************************/
/*  CREATE MODEL & EXPORT  */
/***************************/

// Instantiate Mongoose Model:
var Customer = mongoose.model('Customer', CustomerSchema);

// Export Model:
module.exports = Customer;
