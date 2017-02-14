app.controller('productController', ['$scope', 'productFactory', '$location', '$routeParams', function($scope, productFactory, $location, $routeParams) {

    // Callbacks
    var cb = {
        create: function(createdProduct) {
            $scope.error = '';
            $scope.newProduct = {};
            $scope.show();
        },
        error: function(err) {
            console.log('Errors returned from server:', err);
            $scope.error = err;
        },
        show: function(allProducts) {
            console.log(allProducts);
            $scope.allProducts = allProducts;
        },
        delete: function() {
            $scope.show();
        },
    };

    // Create Product:
    $scope.create = function() {
        console.log('Create Process: Angular controller running...', $scope.newProduct);
        productFactory.create($scope.newProduct, cb.create, cb.error);
    };

    // Show All Products:
    $scope.show = function() {
        console.log('Showing all products...');
        productFactory.show(cb.show);
    };

    // Show All Products on Partial Load:
    $scope.show();

}]);
