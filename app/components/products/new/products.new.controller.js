(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .controller('newProductsController', newProductsController);

    newProductsController.$inject = ['$scope', '$mdSidenav', '$mdDialog', '$timeout', '$state', 'product'];
    
    function newProductsController($scope, $mdSidenav, $mdDialog, $timeout, $state, product) {
        var vm = this;
        vm.closeSidebar = closeSidebar;
        vm.saveProduct = saveProduct;

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
                product.contact = {
                    name: 'vk',
                    phone: '12312313',
                    email: 'vk@test.com'
                };
                $scope.$emit('newProduct', product);
                vm.sidenaveOpen = false;
            }
        }

        return vm;
    }
})();