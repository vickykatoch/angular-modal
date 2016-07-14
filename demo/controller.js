modalDemo.controller('DemoController', ['$scope', function($scope){

    $scope.myData = {
        link: "http://google.com",
        modalShown: false,
        smallModalShown: false,
        hello: 'world',
        foo: 'bar'
    }
    $scope.logClose = function() {
        console.log('close!');
    };
    $scope.toggleModal = function() {
        $scope.myData.modalShown = !$scope.myData.modalShown;
    };

     $scope.toggleSmallModal = function() {
        $scope.myData.smallModalShown = !$scope.myData.smallModalShown;
    };

}]);