app.controller('HomeController', function($scope, toastr, Video){
    $scope.listVideos =  function() {
        Video.fetchAll().then(function (response) {
            $scope.allVideos = response.data;
        });
    };

    $scope.listVideos();

})
