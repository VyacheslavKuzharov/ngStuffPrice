angular
    .module('ngStuffPrice', [
        'ngMaterial',
        'ui.router',
        'angular-storage',
        'angular-jwt'
    ])
    .constant('CONFIG',
    {
        // APIHost: 'https://stuffprice-backend.herokuapp.com'
        APIHost: 'http://localhost:3000'
    });