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


        function closeLogin() {
            $mdDialog.hide();
        }
        
        function loginSubmit(user_credentials) {
            closeLogin();
            authService.login(user_credentials).then(function (response) {
                console.log(response)
                store.set('current_user', {id: response.data.id, email: response.data.email});
                store.set('id_token', response.data.token);
                $location.path('/');
            }, function (error) {
                console.log(error.data)
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