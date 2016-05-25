(function () {
    'use strict';

    angular
        .module('ngStuffPrice')
        .directive('toolbar', toolbar);

    function toolbar() {
        return {
            templateUrl: 'app/components/toolbar/toolbar.tpl.html',
            scope: {
                categories: '=',
                showFilters: '&'
            },
            controller: toolbarController,
            controllerAs: 'toolbarCtrl'
        };

        function toolbarController($state, $scope, $timeout, $mdDialog, $mdMedia, $location, store, authService) {
            var vm = this;
            vm.openSidebar = openSidebar;
            vm.openLogin = openLogin;
            vm.logout = logout;
            vm.isAuthenticated = isAuthenticated;

            $timeout(function () {
                vm.categories = $scope.categories
            }, 1000 );

            function openSidebar() {
                $state.go('products.new', {
                    categories: vm.categories
                })
            }

            function openLogin(event) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
                $mdDialog.show({
                    templateUrl: 'app/components/authentication/login/login.tpl.html',
                    controller: 'loginController',
                    controllerAs: 'loginCtrl',
                    targetEvent: event,
                    clickOutsideToClose:true,
                    fullscreen: useFullScreen
                });
            }
            
            function logout() {
                authService.logout().then(function (response) {
                    if(response.status == 204){
                        store.remove('current_user');
                        store.remove('id_token');
                        $location.path('/');
                    }
                    console.log(response)
                })
            }

            function isAuthenticated() {
               return authService.isAuth()
            }
            
        }
    }
})();