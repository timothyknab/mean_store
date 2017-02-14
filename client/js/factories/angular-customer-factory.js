app.factory('customerFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // Create:
    factory.create = function(customer, createCallback, errorsCallback) {
        console.log('Factory talking...', customer);
        $http.post('/customers', customer)
            .then(function(newCustomer) {
                console.log(newCustomer.data);
                createCallback(newCustomer.data);
            })
            .catch(function(err) {
                console.log(err);
                console.log('Error from DB:', err.data);
                errorsCallback(err.data);
            })
    };

    // Show All:
    factory.show = function(showCallback) {
        console.log('Factory talking...showing all customers...');
        $http.get('/customers')
            .then(function(allCustomers) {
                console.log('All customers returned...', allCustomers.data);
                showCallback(allCustomers.data);
            })
            .catch(function(err) {
                console.log('Error showing all useres...', err.data);
            })
    };


    // Delete User:
    factory.delete = function(customer, deleteCallback) {
        $http.delete('/customers/' + customer._id)
            .then(function(message) {
                console.log(message);
                deleteCallback();
            })
            .catch(function(err) {
                console.log('Error deleting customer!', err.data);
            })
    }

    // Return Factory Object:
    return factory;
}]);
