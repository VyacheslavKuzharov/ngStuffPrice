/**
 * @desc директива заказа, которая специфична модулю заказов в компании Acme
 * @example <div hello-world></div>
 */
angular
    .module('ngStuffPrice')
    .directive('helloWorld', helloWorld);

function helloWorld() {
    return {
        template: "<h1>Hello world!</h1>"
    }
}