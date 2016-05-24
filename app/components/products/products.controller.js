(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .controller('productsController', productsController);

    productsController.$inject = ['$scope', '$mdSidenav', '$mdToast', '$mdDialog', '$state', 'productService'];

    function productsController($scope, $mdSidenav, $mdToast, $mdDialog, $state, productService) {
        var vm = this;
        vm.showFilters = showFilters;

        vm.products;
        vm.categories;

        $scope.$on('newProduct', function (event, product) {
            productService.storeProduct(product).then(function (response) {
                vm.products.unshift(response.data);
            });
            showToast('Saved!')
        });

        productService.getProducts().then(function (response) {
            vm.products = response.data;
            vm.categories = getCategories(vm.products);
        });

        function showFilters() {
            vm.filtersOpen = true;
        }
        
        function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top', 'right')
                    .hideDelay(3000)
            );
        }
        
        function getCategories(products) {
            var categories = [];
            angular.forEach(products, function (item) {
                angular.forEach(item.categories, function (category) {
                    categories.push(category);
                });
            });
            return _.uniq(categories);
        }

        return vm;
    }

})();