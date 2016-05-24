(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .directive('productCard', productCard);

    function productCard() {
        return {
            templateUrl: "app/components/products/card/product-card.tpl.html",
            scope: {
                products: '=products',
                productsFilter: '=productsFilter',
                category: '=category'
            },
            controller: productCardController,
            controllerAs: 'stuffCtrl'
        };

        function productCardController($scope, $timeout, $mdDialog, $mdToast, $state, productService) {
            
            var vm = this;
            vm.editProduct = editProduct;
            vm.deleteProduct = deleteProduct;

            $timeout(function () {
                vm.products = $scope.products
            }, 1000 );

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
                    productService.destroyProduct(product.id);

                    var index = vm.products.indexOf(product);
                    vm.products.splice(index, 1);
                    showToast('Deleted!')
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
            
        }
    }

})();