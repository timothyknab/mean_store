app.factory('dashboardFactory', ['$http', function($http) {

    // Setup Factory Object:
    var factory = {};

    // Show Latest 3 Customers:
    factory.showCustomers = function(showCustomersCallback) {
        console.log('Factory talking...showing latest 3 customers...');
        $http.get('/dashboard/customers')
            .then(function(latestCustomers) {
                console.log('Latest 3 customers returned...', latestCustomers.data);
                showCustomersCallback(latestCustomers.data);
            })
            .catch(function(err) {
                console.log('Error showing latest customers...', err.data);
            })
    };

    // Show latest 5 Products:
    factory.showProducts = function(showProductsCallback) {
        console.log('Factory talking...showing latest 5 products...');
        $http.get('/dashboard/products')
            .then(function(latestProducts) {
                console.log('Latest 5 products returned...', latestProducts.data);
                showProductsCallback(latestProducts.data);
            })
            .catch(function(err) {
                console.log('Error showing latest products...', err.data);
            })
    };

    // Show latest 3 Orders:
    factory.showOrders = function(showOrdersCallback) {
        console.log('Factory talking...showing latest 3 orders...');
        $http.get('/dashboard/orders')
            .then(function(latestOrders) {
                console.log('Latest 3 orders returned...', latestOrders.data);
                showOrdersCallback(latestOrders.data);
            })
            .catch(function(err) {
                console.log('Error showing latest orders...', err.data);
            })
    };

    // Return Factory Object:
    return factory;

}]);
