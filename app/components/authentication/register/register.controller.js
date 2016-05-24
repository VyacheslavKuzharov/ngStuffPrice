(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .controller('registerController', registerController);

    registerController.$inject = ['$mdDialog', '$location', 'authService', 'store'];

    function registerController($mdDialog, $location, authService, store) {
        var vm = this;
        vm.closeRegister = closeRegister;
        vm.registerSubmit = registerSubmit;
        vm.loginOpen = loginOpen;
        
        
        function closeRegister() {
            $mdDialog.hide();
        }
        
        function registerSubmit(user_credentials) {
            closeRegister();
            authService.register(user_credentials).then(function (response) {
                store.set('current_user', {id:response.data.id, email: response.data.email});
                $location.path('/');
            }, function (error) {
                console.log(error.data)
            })
        }
        
        function loginOpen(event) {
            closeRegister()
            $mdDialog.show({
                templateUrl: 'app/components/authentication/login/login.tpl.html',
                controller: 'loginController',
                controllerAs: 'loginCtrl',
                targetEvent: event,
                clickOutsideToClose: true
            });
        }
    }
})();