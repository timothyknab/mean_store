app.controller('dashboardController', ['$scope', 'dashboardFactory', '$location', '$routeParams', function($scope, dashboardFactory, $location, $routeParams) {

    // Callbacks
    var cb = {
        error: function(err) {
            console.log('Errors returned from server:', err);
            $scope.error = err;
        },
        customers: function(latestCustomers) {
            console.log(latestCustomers);
            $scope.latestCustomers = latestCustomers;
        },
        products: function(latestProducts) {
            console.log(latestProducts);
            $scope.latestProducts = latestProducts;
        },
        delete: function() {
            $scope.show();
        },
        orders: function(latestOrders) {
            $scope.latestOrders = latestOrders;
        },
    };

    // Show Latest 3 Customer Records:
    $scope.showCustomers = function() {
        console.log('Showing newest customers and limiting to 3...');
        dashboardFactory.showCustomers(cb.customers);
    };

    // Get Latest 3 Customers on Parial Load:
    $scope.showCustomers();

    // Show Latest 5 New Products:
    $scope.showProducts = function() {
        console.log('Showing newest 5 products...');
        dashboardFactory.showProducts(cb.products);
    };

    // Get Latest 5 Products on Partial Load:
    $scope.showProducts();

    // Show Latest 3 New Orders:
    $scope.showOrders = function() {
        console.log('Showing latest 3 orders...');
        dashboardFactory.showOrders(cb.orders)
    };

    // Get Latest 3 New Orders on Partial Load:
    $scope.showOrders();

}]);
