angular
    .module('ngStuffPrice')
    .config([
        '$stateProvider',
        '$httpProvider',
        '$urlRouterProvider',
        '$mdThemingProvider', function(
            $stateProvider,
            $httpProvider,
            $urlRouterProvider,
            $mdThemingProvider){

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

        // any unknown URLS go to 404
        $urlRouterProvider.otherwise('/');

        // $httpProvider.defaults.headers.common = {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        // };
        //
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $stateProvider
            .state('products', {
                url: '/',
                templateUrl: 'app/components/products/products.tpl.html',
                controller: 'productsController',
                controllerAs: 'stuffCtrl'
            })
            .state('products.new', {
                url: 'products/new',
                templateUrl: 'app/components/products/new/products.new.tpl.html',
                controller: 'newProductsController',
                controllerAs: 'stuffCtrl',
                params: {
                    categories: null
                }
            })
            .state('products.edit', {
                url: 'products/:id/edit',
                templateUrl: 'app/components/products/edit/products.edit.tpl.html',
                controller: 'editProductsController',
                controllerAs: 'stuffCtrl',
                params: {
                    product: null
                }
            });
    }]);