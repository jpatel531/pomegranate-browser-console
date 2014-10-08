angular.module('console', ['ui.codemirror']).controller('AppCtrl', function($scope, $http){

	$scope.submitCommand = function(event) {
		$http.post('/command', {command: $scope.command, tests: $scope.tests}).success(function(data){
			$scope.results = data
		});
	};

    $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'text/x-ruby',
        matchBrackets: true,
        indentUnit: 2
    };


});