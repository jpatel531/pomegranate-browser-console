angular.module('console', []).controller('AppCtrl', function($scope, $http){

	$scope.submitCommand = function(event) {
		$http.post('/command', {command: $scope.command, tests: $scope.tests}).success(function(data){
			$scope.results = data
		});
	};


});