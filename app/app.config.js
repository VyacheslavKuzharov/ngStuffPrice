angular
    .module('ngStuffPrice', [
        'ngMaterial',
        'ui.router',
        'ngMessages',
        'angular-storage',
        'angular-jwt'
    ])
    .constant('CONFIG',
    {
        // APIHost: 'https://stuffprice-backend.herokuapp.com'
        APIHost: 'http://localhost:3000'
    });