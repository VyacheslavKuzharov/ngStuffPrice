angular
    .module('ngStuffPrice', [
        'ngMaterial',
        'ui.router',
        'angular-storage'
    ])
    .constant('CONFIG',
    {
        // APIHost: 'https://stuffprice-backend.herokuapp.com/api'
        APIHost: 'http://localhost:3000/api',
        APIDevise: 'http://localhost:3000'
    });