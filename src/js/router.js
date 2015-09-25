/*global angular*/
angular.module('app')
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function($stateProvider,
    $urlRouterProvider, $httpProvider, $locationProvider) {
    $httpProvider.defaults.withCredentials = true;

    $locationProvider.html5Mode(true);

    $stateProvider
      .state("h", {
        abstract: true,
        templateUrl: "templates/layouts/home.html"
      })
      /*
       * Dash
       */
      .state("h.dash", {
        url: "/main",
        templateUrl: "templates/dash/index.html",
        controller: "DashboardController"
      });

    $urlRouterProvider.otherwise("/main");

  }]);
