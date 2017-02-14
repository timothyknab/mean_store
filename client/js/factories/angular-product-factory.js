app.factory('productFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // Create:
    factory.create = function(product, createCallback, errorsCallback) {
        console.log('Factory talking...', product);
        $http.post('/products', product)
            .then(function(newProduct) {
                console.log(newProduct.data);
                createCallback(newProduct.data);
            })
            .catch(function(err) {
                console.log(err);
                console.log('Error from DB:', err.data);
                errorsCallback(err.data);
            })
    };

    // Show All:
    factory.show = function(showCallback) {
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
