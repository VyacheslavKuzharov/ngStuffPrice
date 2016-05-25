(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .controller('editProductsController', editProductsController);

    editProductsController.$inject = ['$scope', '$mdSidenav', '$mdDialog', '$timeout', '$state', 'productService'];

    function editProductsController($scope, $mdSidenav, $mdDialog, $timeout, $state, productService) {
        var vm = this;
        vm.closeSidebar = closeSidebar;
        vm.saveEdit = saveEdit;
        vm.product = $state.params.product;
        vm.productService = productService;

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

        function saveEdit(product) {

            product.user_id = 1;
            productService.editProduct(product)
            vm.sidenaveOpen = false;
        }

        return vm;
    }
})();