/**
 * Created by Raphson on 7/8/16.
 */
app.controller('TransformController', function($scope, $localStorage, $routeParams, Video, toastr){
    Video.fetchEachVideoDetails($routeParams.id, function(status, data){
        if(status){
            $scope.videoDetails = data.video;
        }
    })

});