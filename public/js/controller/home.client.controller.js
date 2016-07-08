app.controller('HomeController', function($scope, toastr, Video){
    Video.retrieveAll().then(function(response){
        $scope.allVideos = response.data;
    })
})
