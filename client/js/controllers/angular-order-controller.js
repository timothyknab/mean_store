app.controller('orderController', ['$scope', 'orderFactory', '$location', '$routeParams', function($scope, orderFactory, $location, $routeParams) {

    // Callbacks
    var cb = {
        create: function(createdOrder) {
            $scope.error = '';
            $scope.newOrder = {};
            $scope.showOrders();
        },
        show: function(allOrders) {
            $scope.allOrders = $scope.formatTime(allOrders);
        },
        customers: function(allCustomers) {
            console.log(allCustomers);
            $scope.allCustomers = allCustomers;
        },
        products: function(allProducts) {
            console.log(allProducts);
            $scope.allProducts = allProducts;
        },
    };

    // Convert Time:
    $scope.formatTime = function(array) {
        for (var i = 0; i < array.length; i++) {
            array[i].momentDate = moment(array[i].createdAt).format("MMMM Do YYYY");
        };
        console.log(array);
        return array;
    };

    // Create Order:
    $scope.create = function() {
        console.log('Create Process: Angular controller running...', $scope.newOrder);
        orderFactory.create($scope.newOrder, cb.create);
    };

    // Show All Orders:
    $scope.showOrders = function() {
        console.log('Showing all orders...');
        orderFactory.showOrders(cb.show);
    };

    // Show All Orders on Partial Load:
    $scope.showOrders();

    // Show All Customers:
    $scope.showCustomers = function() {
        orderFactory.showCustomers(cb.customers);
    };

    // Show All Customers on Partial Load:
    $scope.showCustomers();

    // Show All Products:
    $scope.showProducts = function() {
        orderFactory.showProducts(cb.products);
    };

    // Show All Products on Partial Load:
    $scope.showProducts()

}]);
