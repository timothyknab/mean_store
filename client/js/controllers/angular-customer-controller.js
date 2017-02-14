app.controller('customersController', ['$scope', 'customerFactory', '$location', '$routeParams', function($scope, customerFactory, $location, $routeParams) {

    // Callbacks
    var cb = {
        create: function(newCustomer) {
            $scope.error = '';
            $scope.newCustomer = {};
            $scope.show();
        },
        error: function(err) {
            console.log('Errors returned from server:', err);
            $scope.error = err;
        },
        show: function(allCustomers) {
            console.log(allCustomers);
            $scope.allCustomers = allCustomers;
        },
        delete: function() {
            $scope.show();
        },
    };

    // Create Customer:
    $scope.create = function() {
        console.log('Create Process: Angular controller running...', $scope.newCustomer);
        customerFactory.create($scope.newCustomer, cb.create, cb.error);
    };

    // Show All Customers:
    $scope.show = function() {
        console.log('Showing all customers...');
        customerFactory.show(cb.show);
    };

    // Show All Customers on Partial Load:
    $scope.show();

    // Delete Customer:
    $scope.delete = function(customer) {
        console.log('DELETING CUSTOMER');
        customerFactory.delete(customer, cb.delete);
    };

}]);
