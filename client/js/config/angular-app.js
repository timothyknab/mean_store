// Define Module:
var app = angular.module('app', ['ngRoute']);

// Define Routes:
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/index.html', // root route partial
            controller: 'dashboardController',
        })
        .when('/products', {
            templateUrl: 'html/products.html',
            controller: 'productController',
        })
        .when('/orders', {
            templateUrl: 'html/orders.html',
            controller: 'orderController',
        })
        .when('/customers', {
            templateUrl: 'html/customers.html',
            controller: 'customerController',
        })
        .when('/settings', {
            templateUrl: 'html/settings.html',
        })
        .otherwise({
            redirectTo: '/',
        })
});
