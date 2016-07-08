/**
 * Created by Raphson on 7/8/16.
 */
app.controller('VideoController', function($scope, $http, $localStorage, Video, toastr){
    $scope.listMyVideos = function(){
        Video.fetchMyVideos(function(success, data){
            if(success){
                $scope.myVideos = data.videos;
            } else {
                toastr.error(data.message, 'Error');
            }
        })
    };

    $scope.listMyVideos();

});