// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.factory("$fileFactory",function($q) {
  var File = function(){
    //alert('FileController1');
  };
  File.prototype = {
    getParentDirectory: function(path) {
      var deferred = $q.defer();
      window.resolveLocalFileSystemURI(path, function(fileSystem){
        //alert('FileController2');
        fileSystem.getParent(function(result){
          deferred.resolve(result);
        }, function(error){
          deferred.reject(error);
        });
      }, function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    },

    getEntriesAtRoot: function() {
      var deferred = $q.defer();
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        //alert('FileController3');
        var directoryReader = fileSystem.root.createReader();
        directoryReader.readEntries(function(entries){
          deferred.resolve(entries);
        }, function(error){
          deferred.reject(error);
        });
      }, function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    },

    getEntries: function(path) {
      var deferred = $q.defer();
      window.resolveLocalFileSystemURI(path, function(fileSystem){
        alert('getEntries' + path + ' ' + fileSystem);
        var directoryReader = fileSystem.createReader();
        directoryReader.readEntries(function(entries){
          alert('resolved');
          deferred.resolve(entries);
        }, function(error){
          alert('rejected1');
          deferred.reject(error);
        });
      }, function(error){
        alert('rejected2');
        deferred.reject(error);
      });
      return deferred.promise;
    }
  };
    return File;
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })
    .state('tab.files', {
      url: '/files',
      views: {
        'tab-dash': {
          templateUrl: 'templates/files-list.html',
          controller: 'FileController'
        }
      }
    })

  .state('tab.charts', {
      url: '/charts',
      views: {
        'tab-charts': {
          templateUrl: 'templates/tab-charts.html',
          controller: 'chartsCtrl'
        }
      }
    })
    .state('tab.chart-detail', {
      url: '/charts/:chartId',
      views: {
        'tab-charts': {
          templateUrl: 'templates/chart-detail.html',
          controller: 'chartDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
