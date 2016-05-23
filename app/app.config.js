angular
    .module('ngStuffPrice', [
        'ngMaterial',
        'ui.router'
    ])
    .constant('CONFIG',
    {
        // APIHost: 'https://stuffprice-backend.herokuapp.com/api'
        APIHost: 'http://localhost:3000/api'
    });