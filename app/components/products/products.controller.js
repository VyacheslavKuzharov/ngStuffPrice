(function () {
    "use strict";

    angular
        .module('ngStuffPrice')
        .controller('productsController', productsController);

    productsController.$inject = ['$scope', '$http', '$mdSidenav', '$mdToast', '$mdDialog', '$state', 'product'];

    function productsController($scope, $http, $mdSidenav, $mdToast, $mdDialog, $state, product) {
        var vm = this;
        vm.openSidebar = openSidebar;
        vm.editProduct = editProduct;
        vm.deleteProduct = deleteProduct;

        vm.products;
        vm.product;
        vm.categories;

        $scope.$on('newProduct', function (event, product) {
            product.id = vm.products.length + 1;
            vm.products.push(product);
            showToast('Saved!')
        });

        product.getProducts().then(function (response) {
            vm.products = response.data;
            vm.categories = getCategories(vm.products);
        });

        function openSidebar() {
            $state.go('products.new')
        }
        
        function editProduct(product) {
            $state.go('products.edit', {
                id: product.id,
                product: product
            });
        }

        function deleteProduct(event, product) {
            var confirm = $mdDialog.confirm()
                .title('Are you shure?')
                .ok('yes')
                .cancel('no')
                .targetEvent(event);
            $mdDialog.show(confirm).then(function () {
                var index = vm.products.indexOf(product);
                vm.products.splice(index, 1);
            }, function () {

            });
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