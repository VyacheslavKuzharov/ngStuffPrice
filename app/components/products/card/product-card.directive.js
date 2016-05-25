(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .directive('productCard', productCard);

    function productCard() {
        return {
            templateUrl: "app/components/products/card/product-card.tpl.html",
            scope: {
                products: '=',
                productsFilter: '=',
                category: '='
            },
            controller: productCardController,
            controllerAs: 'stuffCtrl'
        };

        function productCardController($scope, $timeout, $mdDialog, $mdToast, $state, productService, authService, jwtHelper, store) {
            
            var vm = this;
            vm.editProduct = editProduct;
            vm.deleteProduct = deleteProduct;
            vm.authService = authService;
            vm.isCardOwner = isCardOwner;

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

            function isCardOwner(contactId) {
                var currentUserId = jwtHelper.decodeToken(store.get('id_token')).user_id;

                if(contactId === currentUserId){
                    return true
                } else{
                    return false
                }
            }
            
        }
    }

})();