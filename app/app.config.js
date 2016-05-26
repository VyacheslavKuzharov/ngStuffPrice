angular
    .module('ngStuffPrice', [
        'ngMaterial',
        'ui.router',
        'ngMessages',
        'angular-storage',
        'angular-jwt',
        'ui.bootstrap'
    ])
    .constant('CONFIG',
    {
        APIHost: 'https://stuffprice-backend.herokuapp.com'
    });