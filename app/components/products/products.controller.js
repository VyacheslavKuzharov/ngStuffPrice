(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .controller('productsController', productsController);

    productsController.$inject = ['$scope', '$mdSidenav', '$mdToast', '$mdDialog', '$state','$stateParams', '$location', 'productService'];

    function productsController($scope, $mdSidenav, $mdToast, $mdDialog, $state, $stateParams, $location, productService) {
        var vm = this;
        vm.showFilters = showFilters;
        vm.pageChanged = pageChanged;

        vm.products;
        vm.categories;
        vm.maxSize = 5;
        vm.CurrentPage = $stateParams.page || 1;

        $scope.$on('newProduct', function (event, product) {
            productService.storeProduct(product).then(function (response) {
                vm.products.unshift(response.data);
                vm.totalItems = vm.totalItems + 1;
            });
            showToast('Saved!')
        });

        productService.getProducts(vm.CurrentPage).then(function (response) {
            var productAry = response.data;
            vm.totalItems = productAry[productAry.length - 1].products_count;

            productAry.pop();
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

        function pageChanged() {
            $location.url('/products?page=' + vm.CurrentPage)
        }

        return vm;
    }

})();