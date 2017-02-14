app.factory('orderFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // Create:
    factory.create = function(order, createCallback) {
        console.log('Factory talking...', order);
        $http.post('/orders', order)
            .then(function(newOrder) {
                console.log(newOrder.data);
                createCallback(newOrder.data);
            })
            .catch(function(err) {
                console.log(err);
                console.log('Error from DB:', err.data);
            })
    };

    // Show All Orders:
    factory.showOrders = function(showCallback) {
        console.log('Factory talking...showing all orders...');
        $http.get('/orders')
            .then(function(allOrders) {
                console.log('All orders returned...', allOrders.data);
                showCallback(allOrders.data);
            })
            .catch(function(err) {
                console.log('Error showing all orders...', err.data);
            })
    };

    // Show All Customers:
    factory.showCustomers = function(showCallback) {
        console.log('Factory talking...showing all customers...');
        $http.get('/customers')
            .then(function(allCustomers) {
                console.log('All customers returned...', allCustomers.data);
                showCallback(allCustomers.data);
            })
            .catch(function(err) {
                console.log('Error showing all customers...', err.data);
            })
    };

    // Show All Products:
    factory.showProducts = function(showCallback) {
        console.log('Factory talking...showing all products...');
        $http.get('/products')
            .then(function(allProducts) {
                console.log('All products returned...', allProducts.data);
                showCallback(allProducts.data);
            })
            .catch(function(err) {
                console.log('Error showing all products...', err.data);
            })
    };

    // Return Factory Object:
    return factory;
}]);
