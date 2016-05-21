(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .controller('editProductsController', editProductsController);

    editProductsController.$inject = ['$scope', '$mdSidenav', '$mdDialog', '$timeout', '$state', 'product'];

    function editProductsController($scope, $mdSidenav, $mdDialog, $timeout, $state, product) {
        console.log($state.params)
        var vm = this;
        vm.closeSidebar = closeSidebar;
        vm.saveEdit = saveEdit;
        vm.product = $state.params.product;

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

        function saveEdit() {
            vm.sidenaveOpen = false;
        }

        return vm;
    }
})();