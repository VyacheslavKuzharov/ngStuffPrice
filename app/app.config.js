angular
    .module('ngStuffPrice', [
        'ngMaterial',
        'ui.router'
    ])
    .constant('CONFIG',
    {
        APIHost: '../data/ads.json'
    });