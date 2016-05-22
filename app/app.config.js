angular
    .module('ngStuffPrice', [
        'ngMaterial',
        'ui.router'
    ])
    .constant('CONFIG',
    {
        // APIHost: '../data/ads.json'
        // APIHost: 'https://stuffprice-backend.herokuapp.com/api'
        APIHost: 'http://localhost:3000/api'
    });