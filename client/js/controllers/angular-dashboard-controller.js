app.controller('dashboardController', ['$scope', 'dashboardFactory', '$location', '$routeParams', function($scope, dashboardFactory, $location, $routeParams) {

    // Callbacks
    var cb = {
        error: function(err) {
            console.log('Errors returned from server:', err);
            $scope.error = err;
        },
        showCustomers: function(allCustomers) {
            console.log(allUsers);
            $scope.allCustomers = allCustomers;
        },
        delete: function() {
            $scope.show();
        },
    };

    // Show Users:
    $scope.showCustomer = function() {
        console.log('Showing all customers...');
        dashboardFactory.show(cb.showCustomers);
    };

}]);
