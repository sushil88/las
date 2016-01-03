angular.module('starter.controllers', [])


.controller('FileController', function($scope, $ionicPlatform, $fileFactory){
    var fs = new $fileFactory();
    //alert('FileController5');
    $ionicPlatform.ready(function(){
      //alert('FileController6');
      fs.getEntriesAtRoot().then(function(result){
        //alert('FileController7', result);
        $scope.files = result;
      }, function(error){
        //alert('FileController8', error);
        alert('errr' + error);
      });
      //alert('FileController9', $scope.files);
      $scope.getContents = function(path) {
        //alert('FileController10', $scope.files);
        alert('getContents'+ path);
        fs.getEntries(path).then(function(result){
          alert("Inside ",path);
          $scope.files = result;
          $scope.files.unshift({name: "[parent]"});
          fs.getParentDirectory(path).then(function(result){
            result.name = "[parent]";
            $scope.files[0] = result;
          });
        }, function (error) {
          alert('error', error);
        });
        //alert("Outside "+path);
        //var reader  = new FileReader();
        //reader.onloadend = function () {
        //  //preview.src = reader.result;
        //  alert('loaded');
        //  alert(reader.result);
        //}
        //reader.readAsDataURL(path);
      }

    });
})

.controller('DashCtrl', function($scope, charts) {
  $scope.showContent = function($fileContent){
    //var a = "data";
    alert('here');
    var arrayOfStrings = $fileContent.split('~');
    var data = {};
    arrayOfStrings.forEach(function(value){
      if(value) {
        var subsplit = value.trim().split('\n');
        if (subsplit[0].trim().charAt(0) === "V") {
          alert('here1');
          data['version'] = {};
          //alert('Inside ' + subsplit[0]);
          subsplit.forEach(function (eachLine, index, array) {
            //skip first line
            if(index !== 0) {
              if (eachLine && eachLine.charAt(0) !== '#') {
                var splitEachLine = eachLine.split(':');
                var test = splitEachLine[0].trim().split(' ');
                data.version[test[0]] = test[test.length-1];
                data.version[test[0] + '_info'] = splitEachLine[1].trim();
              }
            }
          });
          //alert(JSON.stringify(data));
        }
        //if (subsplit[0].trim() === "Well Information Section") {
        if (subsplit[0].trim().charAt(0) === "W") {
          alert('here3');
          //alert('Inside Well Information Section');
          data['wellInfo'] = {};
          subsplit.forEach(function (eachLine, index, array) {
            //skip first line
            if(index !== 0 && eachLine) {
              var newLine = eachLine.trim();
              if (newLine.charAt(0) !== '#') {
                var splitEachLine = newLine.split(':');
                var firstPart = splitEachLine[0].trim().split(' ');
                var secondPart = splitEachLine[1].trim();
                var name_unit = firstPart[0].split('.');
                data.wellInfo[name_unit[0].trim()] = firstPart[firstPart.length-1];
                data.wellInfo[name_unit[0].trim() + '_info'] = secondPart;
              }
            }
          });
          //alert(JSON.stringify(data));
          //console.log(JSON.stringify(data));
        }
        //if (subsplit[0].trim() === "Curve Information Section") {
        if (subsplit[0].trim().charAt(0) === "C") {
          alert('here4');
          //alert("Curve Information Section");
          data['curveInfo'] = {};
          data.curveInfo.curveArray = [];
          subsplit.forEach(function (eachLine, index, array) {
            //skip first line
            if(index !== 0 && eachLine) {
              var newLine = eachLine.trim();
              if (newLine.charAt(0) !== '#') {
                var splitEachLine = newLine.split(':');
                var firstPart = splitEachLine[0].trim().split('.');
                var secondPart = splitEachLine[1].trim();
                var name_unit = firstPart[0].split('.');
                data.curveInfo[name_unit[0].trim()] = firstPart[1];
                data.curveInfo[name_unit[0].trim() + '_info'] = secondPart;
                data.curveInfo.curveArray.push(name_unit[0].trim());
              }
            }
          });
          //alert(JSON.stringify(data));
          //console.log(JSON.stringify(data));
        }
        if (subsplit[0].trim().charAt(0) === 'A') {
          alert('here5');
          // Read ASCII values
          data['curveData'] = {};
          data.curveInfo.curveArray.forEach(function (elem, index, array){
            // Initialize each data array
            data.curveData[elem] = [];
          });
          //alert("Curve ASCII Information Section" + data.curveData);
          subsplit.forEach(function (eachLine, index, array) {
            if(index !== 0 && eachLine) {
              var newLine = eachLine.trim();
              if (newLine.charAt(0) !== '#') {
                var iterator = 0;
                var asciiData = newLine.split(' ');
                asciiData.forEach(function(elem) {
                  if (elem) {
                    var eachValue = elem.trim() === data.wellInfo["NULL"] ? null : elem.trim();
                    data.curveData[data.curveInfo.curveArray[iterator]].push(eachValue);
                    iterator++;
                  }
                });
              }
            }
          });
          //alert(JSON.stringify(data));
          //console.log(JSON.stringify(data));
        }
      }
    });
    alert('here2');
    //alert(JSON.stringify(data));
    charts.set(data);
    alert('Uploaded file successfully!!');
    $scope.content = $fileContent;
  };
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
  $scope.chart = charts.getAxis()[0] + ' Vs ' + $stateParams.chartId;
  //$scope.labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  //$scope.series = ['Series A', 'Series B'];
  //$scope.data = [
  //  [null,null, 80, 81, 56 ,55, null, null,null, 80, 81, 56 ,55, null, null,null, 80, 81, 56 ,55],
  //  [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27]
  //];
  //$scope.onClick = function (points, evt) {
  //  console.log(points, evt);
  //};
  var xAxis = charts.getXAxisData();
  alert(xAxis);
  alert($stateParams.chartId);
  var yAxis = charts.getAxisData($stateParams.chartId);
  alert(yAxis);
  var data = {
    //labels: ["1", "2", "3", "4", "5", "6", "7", "1", "2", "3", "4", "5", "6", "7", "1", "2", "3", "4", "5", "6", "7"],
    labels : xAxis,
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        //data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
        data: yAxis
      }
      //{
      //  label: "My Second dataset",
      //  fillColor: "rgba(151,187,205,0.2)",
      //  strokeColor: "rgba(151,187,205,1)",
      //  pointColor: "rgba(151,187,205,1)",
      //  pointStrokeColor: "#fff",
      //  pointHighlightFill: "#fff",
      //  pointHighlightStroke: "rgba(151,187,205,1)",
      //  data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90]
      //}
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
})

.directive('onReadFile', function ($parse) {
  alert('I was here too');
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
      var fn = $parse(attrs.onReadFile);

      element.on('change', function(onChangeEvent) {
        var reader = new FileReader();

        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {$fileContent:onLoadEvent.target.result});
          });
        };

        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
});
