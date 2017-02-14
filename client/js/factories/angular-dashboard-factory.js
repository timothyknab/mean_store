app.factory('dashboardFactory', ['$http', function($http) {

    // Setup Factory Object:
    var factory = {};

    // Show Customers:
    factory.showCustomers = function(showCallback) {
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

    // Return Factory Object:
    return factory;

}]);
