angular.module('starter.controllers', [])


.controller('FileController', function($scope, $ionicPlatform, $fileFactory){
    //var fs = new $fileFactory();
    //alert('FileController5');
    //$ionicPlatform.ready(function(){
    //  alert('FileController6');
    //  fs.getEntriesAtRoot().then(function(result){
    //    alert('FileController7', result);
    //    $scope.files = result;
    //  }, function(error){
    //    alert('FileController8', error);
    //    alert('errr' + error);
    //  });
    //  alert('FileController9', $scope.files);
    //  $scope.getContents = function(path) {
    //    alert('FileController10', $scope.files);
    //    fs.getEntries(path).then(function(result){
    //      $scope.files = result;
    //      $scope.files.unshift({name: "[parent]"});
    //      fs.getParentDirectory(path).then(function(result){
    //        result.name = "[parent]";
    //        $scope.files[0] = result;
    //      });
    //    }, function (error) {
    //      alert('error', error);
    //    });
    //  }
    //
    //});
})

.controller('DashCtrl', function($scope, charts) {
    //// Triggered on a button click, or some other target
    //$scope.showPopup = function() {
    //  $scope.data = {}
    //  // An elaborate, custom popup
    //  var myPopup = $ionicPopup.show({
    //    //template: '<input type="password" ng-model="data.wifi">',
    //    template: '<ion-content ng-controller="FileController">' +
    //                '<div class="list">' +
    //                  '<div ng-repeat="file in files">' +
    //                    '<a class="item item-icon-left" href="#" ng-Click="getContents(file.nativeURL)">' +
    //                      '<i ng-show = "file.isDirectory" class="icon ion-folder"></i>' +
    //                      '<i ng-show = "file.isFile" class="icon ion-document"></i>' +
    //                      '{{file.name}}' +
    //                    '</a>' +
    //                  '</div>' +
    //                '</div>' +
    //              '</ion-content>',
    //    title: 'Select a LAS file',
    //    subTitle: '.las or .txt',
    //    //height: '80%',
    //    scope: $scope,
    //    //buttons: [
    //    //  { text: 'Cancel', class: 'button'}
    //    //]
    //  });
    //  myPopup.then(function(res) {
    //    console.log('Tapped!', res);
    //  });
    //  //$timeout(function() {
    //  //  myPopup.close(); //close the popup after 3 seconds for some reason
    //  //}, 3000);
    //};
  })

.controller('chartsCtrl', function($scope, charts) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.charts = charts.all();
  $scope.remove = function(chart) {
    charts.remove(chart);
  };
})

.controller('chartDetailCtrl', function($scope, $stateParams, charts) {
  $scope.chart = charts.get($stateParams.chartId);
  //$scope.labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  //$scope.series = ['Series A', 'Series B'];
  //$scope.data = [
  //  [null,null, 80, 81, 56 ,55, null, null,null, 80, 81, 56 ,55, null, null,null, 80, 81, 56 ,55],
  //  [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27]
  //];
  //$scope.onClick = function (points, evt) {
  //  console.log(points, evt);
  //};
    var data = {
      labels: ["1", "2", "3", "4", "5", "6", "7", "1", "2", "3", "4", "5", "6", "7", "1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
    var ctx = document.getElementById("myChart").getContext("2d");
    var myLineChart = new Chart(ctx).Line(data, {bezierCurve: false, animateRotate : true,});
    myLineChart.resize();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
