var bluemixApp =  angular.module('bluemixApp', []);
bluemixApp.controller("BlueMixController",function($scope){
	
	$scope.firstname="test bluemix";
	
});
bluemixApp.run(function ($rootScope) {
	console.log("initialisation de l'application BlueMix");
 });