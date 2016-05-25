(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .controller('loginController', loginController);

    loginController.$inject = ['$mdDialog', '$location', 'authService', 'store'];

    function loginController($mdDialog, $location, authService, store) {
        var vm = this;
        vm.closeLogin = closeLogin;
        vm.loginSubmit = loginSubmit;
        vm.registerOpen = registerOpen;
        vm.loginErrorMsg


        function closeLogin() {
            $mdDialog.hide();
        }
        
        function loginSubmit(user_credentials) {
            authService.login(user_credentials).then(function (response) {
                closeLogin();
                store.set('current_user', {id: response.data.id, email: response.data.email});
                store.set('id_token', response.data.token);
                $location.path('/');
            }, function (response) {
                vm.loginErrorMsg = response.data.error
                vm.showError = true;
            })
        }
        
        function registerOpen(event) {
            closeLogin()
            $mdDialog.show({
                templateUrl: 'app/components/authentication/register/signup.tpl.html',
                controller: 'registerController',
                controllerAs: 'registerCtrl',
                targetEvent: event,
                clickOutsideToClose:true
            });
        }
    }
})();