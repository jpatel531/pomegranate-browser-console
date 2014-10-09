angular.module('console', ['ui.codemirror']).controller('AppCtrl', function($scope, $http){

	$scope.submitCommand = function(event) {
		NProgress.start();
		$http.post('/command', {command: $scope.command, tests: $scope.tests}).success(function(data){
			$scope.results = data
			NProgress.done();
		});
	};

    $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'text/x-ruby',
        matchBrackets: true,
        indentUnit: 2
    };


	$http({
	    url: 'https://api.github.com/repos/jpatel531/tut-fizz/contents/tutorial.json',
	    method: 'GET',
	    headers: {
	        "Accept": "application/vnd.github-blob.raw"
	    }
	}).success(function(response){
        $scope.step = response[0]
	}).then(function(){
        var url = "https://api.github.com/repos/jpatel531/tut-fizz/contents/" + $scope.step.spec + "?ref=" + $scope.step.commit
        console.log(url)
        $http({
            url: url,
            method: 'GET',
            headers: {
                "Accept": "application/vnd.github-blob.raw"
            }

        }).success(function(data){
            $scope.tests = data
        });
    });

});