/*global angular*/
angular.module('app', [
    'ngLocale',
    // 'ngAnimate',
    'ui.router',
    'chart.js',
    'app.controllers',
    'app.services',
    'app.filters',
    'app.directives'
  ])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.bodyClass = 'loading';
  }]);

angular.module('app.controllers', []);
angular.module('app.services', []);
angular.module('app.filters', []);
angular.module('app.directives', []);