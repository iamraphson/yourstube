/**
 * Created by Raphson on 7/8/16.
 */
app.controller('VideoController', function($scope, $http, $localStorage, Video, toastr, $window){
    $scope.listMyVideos = function(){
        Video.fetchMyVideos(function(success, data){
            if(success){
                $scope.myVideos = data.videos;
            } else {
                toastr.error(data.message, 'Error');
            }
        })
    };

    $scope.deleteVideo = function(public_id){
        Video.deleteVideo(public_id, function(status, message){
             if(status){
                toastr.success(data.message);
                $window.location.assign('/myvideos');
             } else {
                toastr.error("Error occurred. Update Failed", 'Error');
             }
        })
    };

    $scope.listMyVideos();
});