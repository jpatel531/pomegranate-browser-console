angular.module('console', ['ui.codemirror']).controller('AppCtrl', function($scope, $http){

	$scope.submitCommand = function(event) {
		NProgress.start();
		$http.post('/command', {command: $scope.command, tests: $scope.tests}).success(function(data){
			$scope.results = data
			NProgress.done();
            $scope.failures = (typeof($scope.results.summary_line) === 'undefined') || _.any($scope.results.examples, function(example){
                return example.status == 'failed'
            });
		});
	};

    $scope.goToNextStep = function(){ $scope.stepNumber ++  };

    $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'text/x-ruby',
        matchBrackets: true,
        indentUnit: 2
    };

    $scope.$watch('stepNumber', function(){
        $scope.step = $scope.tutorial[$scope.stepNumber]
        var url = "https://api.github.com/repos/jpatel531/pomegranate-fizzbuzz/contents/" + $scope.step.spec + "?ref=" + $scope.step.commit
        $http({
            url: url,
            method: 'GET',
            headers: {
                "Accept": "application/vnd.github-blob.raw"
            }

        }).success(function(data){
            $scope.tests = data.replace(/require (["'])(?:(?=(\\?))\2.)*?\1/, "");
        });
    });


	$http({
	    url: 'https://api.github.com/repos/jpatel531/pomegranate-fizzbuzz/contents/pomegranate.json',
	    method: 'GET',
	    headers: {
	        "Accept": "application/vnd.github-blob.raw"
	    }
	}).success(function(response){
        $scope.tutorial = response
        $scope.stepNumber = 0
	});

});