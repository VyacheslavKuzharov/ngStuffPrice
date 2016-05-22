(function () {
    'use strict';
    angular
        .module('ngStuffPrice')
        .factory('productService', productService);

    productService.$inject = ['$http', 'CONFIG'];

    function productService ($http, CONFIG) {
        return {
            getProducts: getStuff,
            storeProduct: saveStuff,
            editProduct: editStuff,
            destroyProduct: destroyStuff
        };

        function getStuff() {
           return $http.get(CONFIG.APIHost + '/products')
        }

        function saveStuff(product) {
            return $http.post(CONFIG.APIHost + '/products', {product: product})
        }

        function editStuff(product) {
            return $http.put(CONFIG.APIHost + '/products/' + product.id, {product: product})
        }

        function destroyStuff(id) {
            return $http.delete(CONFIG.APIHost + '/products/' + id)
        }
    }

})();