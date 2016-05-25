(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .controller('newProductsController', newProductsController);

    newProductsController.$inject = ['$scope', '$mdSidenav', '$mdDialog', '$timeout', '$state', 'store', 'productService', 'jwtHelper'];
    
    function newProductsController($scope, $mdSidenav, $mdDialog, $timeout, $state, store, productService, jwtHelper) {
        var vm = this;
        vm.closeSidebar = closeSidebar;
        vm.saveProduct = saveProduct;
        vm.categories = $state.params.categories;

        $timeout(function () {
            $mdSidenav('left').open();
        });

        $scope.$watch('stuffCtrl.sidenaveOpen', function (value) {
            if(value === false){
                $mdSidenav('left').close().then(function () {
                    $state.go('products');
                })
            }
        });

        function closeSidebar() {
            vm.sidenaveOpen = false;
        }

        function saveProduct(product) {
            if(product){
                product.user_id = jwtHelper.decodeToken(store.get('id_token')).user_id;
                $scope.$emit('newProduct', product);
                vm.sidenaveOpen = false;
            }
        }

        return vm;
    }
})();