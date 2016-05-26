angular
    .module('ngStuffPrice')
    .config([
        '$stateProvider',
        '$httpProvider',
        '$locationProvider',
        '$urlRouterProvider',
        '$mdThemingProvider',
        'jwtInterceptorProvider', function(
            $stateProvider,
            $httpProvider,
            $locationProvider,
            $urlRouterProvider,
            $mdThemingProvider,
            jwtInterceptorProvider){

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

        jwtInterceptorProvider.tokenGetter = function(store) {
            return store.get('id_token');
        };

            
        $urlRouterProvider.otherwise('/');

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
            })
            .state('pagin', {
                url: '/products?page',
                templateUrl: 'app/components/products/products.tpl.html',
                controller: 'productsController',
                controllerAs: 'stuffCtrl'
            });

        $httpProvider.interceptors.push('jwtInterceptor');
    }]);