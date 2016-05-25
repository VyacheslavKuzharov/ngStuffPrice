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

        vm.RegErrorMsg
        
        
        function closeRegister() {
            $mdDialog.hide();
        }
        
        function registerSubmit(user_credentials) {
            authService.register(user_credentials).then(function (response) {
                closeRegister();
                store.set('current_user', {id:response.data.id, email: response.data.email});
                store.set('id_token', response.data.token);
                $location.path('/');
            }, function (response) {
                vm.RegErrorMsg = response.data.errors.password_confirmation[0];
                vm.showRegError = true;
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