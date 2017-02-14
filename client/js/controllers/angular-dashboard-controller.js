app.controller('dashboardController', ['$scope', 'dashboardFactory', '$location', '$routeParams', function($scope, dashboardFactory, $location, $routeParams) {

    // Callbacks
    var cb = {
        error: function(err) {
            console.log('Errors returned from server:', err);
            $scope.error = err;
        },
        showCustomers: function(latestCustomers) {
            console.log(latestCustomers);
            $scope.latestCustomers = latestCustomers;
        },
        showProducts: function(latestProducts) {
            console.log(latestProducts);
            $scope.latestProducts = latestProducts;
        },
        delete: function() {
            $scope.show();
        },
    };

    // Show Latest 3 Customer Records:
    $scope.showCustomers = function() {
        console.log('Showing newest customers and limiting to 3...');
        dashboardFactory.showCustomers(cb.showCustomers);
    };

    // Get Latest 3 Customers on Parial Load:
    $scope.showCustomers();

    // Show Latest 5 New Products:
    $scope.showProducts = function() {
        console.log('Showing newest 5 products...');
        dashboardFactory.showProducts(cb.showProducts);
    };

    // Get Latest 5 Products on Partial Load:
    $scope.showProducts();

}]);
