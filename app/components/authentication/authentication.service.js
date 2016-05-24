(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .factory('authService', auth);

    auth.$inject = ['$http', 'CONFIG', 'store'];

    function auth($http, CONFIG, store) {

        return {
            login: login,
            register: register,
            logout: logout,
            userSignedIn: userSignedIn

        };

        function login(user_credentials) {
            return $http.post(CONFIG.APIDevise + '/users/sign_in',
                {user: user_credentials}, 
                {headers: {'Content-Type': 'application/json' , 'Accept': 'application/json'}}
            )
        }

        function register(user_credentials) {
            return $http.post(CONFIG.APIDevise + '/users', 
                {user: user_credentials},
                {headers: {'Content-Type': 'application/json' , 'Accept': 'application/json'}}
            )
        }

        function logout() {
            return $http.delete(CONFIG.APIDevise + '/users/sign_out',
                {headers: {'Content-Type': 'application/json' , 'Accept': 'application/json'}}
            )
        }

        function userSignedIn() {
            var user = store.get('current_user');

            if(user) {
                return true
            } else {
                return false
            }
        }
    }
})();