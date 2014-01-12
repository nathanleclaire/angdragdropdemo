var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.darkBody = false;
  $scope.imgSrcs = [];

  $scope.darkenBody = function() {
    $scope.darkBody = true;
  };

  $scope.lightenBody = function() {
    $scope.darkBody = false;
  };
});

app.directive('imageDragDropUpload', function($http) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var darkenBody = function(event) {
        event.preventDefault();
        scope.$apply(function() {
          scope.darkenBody();
        });
      };
      elm.bind('dragenter', darkenBody);
      elm.bind('dragover', darkenBody);
      elm.bind('drop', function(event) {
        event.preventDefault();
        var imageSrc = $(event.originalEvent.dataTransfer.getData('text/html')).filter(function(i, elm) {
          return $(elm).is('img');
        }).attr('src');
        scope.imgSrcs.push(imageSrc);
        scope.lightenBody();
      });
    }
  };
});

app.directive('dotFlasher', function($interval) {
  return {
    restrict: 'E',
    scope: {
      displayText: '@'
    },
    template: '{{ realContent }}{{ flashingChars }}',
    link: function(scope, element, attrs) {
      var splitMessage = attrs.displayText.split(attrs.flashChar);
      var realContent = splitMessage.shift();
      var numFlashingChars = splitMessage.length;
      scope.flashingChars = attrs.flashChar;
      scope.realContent = realContent;
      $interval(function() {
        if (scope.flashingChars.length >= numFlashingChars) {
          scope.flashingChars = '';
        } else {
          scope.flashingChars += attrs.flashChar;
        }
      }, attrs.flashInterval);
    }
  };
});
