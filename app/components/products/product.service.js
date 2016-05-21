(function () {
    'use strict';
    angular
        .module('ngStuffPrice')
        .factory('product', product);

    product.$inject = ['$http', 'CONFIG'];

    function product ($http, CONFIG) {
        return {
            getProducts: getStuff
        };

        function getStuff() {
           return $http.get(CONFIG.APIHost)
        }
    }

})();