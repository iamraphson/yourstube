/**
 * Created by Raphson on 7/8/16.
 */
app.controller('TransformController', function($scope, $localStorage, $routeParams, Video, toastr){
    Video.fetchEachVideoDetails($routeParams.id, function(status, data){
        if(status){
            $scope.videoDetails = data.video;
        }
    });

    $scope.updateVideo = function(){
        var videoDetails = {
            tag: $scope.videoDetails.tag,
            title: $scope.videoDetails.title,
            description: $scope.videoDetails.description,
            audio: $scope.videoDetails.audio,
            format: $scope.videoDetails.format,
            width: $scope.videoDetails.width,
            height: $scope.videoDetails.height,
            startOffset: $scope.videoDetails.startOffset,
            duration: $scope.videoDetails.duration,
            videoBackground: $scope.videoDetails.backgroundColor,
            url: $scope.videoDetails.url
        };

        Video.updateVideoDetails($scope.videoDetails.public_id, videoDetails, function(status, data){
            if(status) {
                toastr.success(data.message);
                $scope.videoDetails.preview = data.audioUrl;
                $scope.videoDetails.colorPreview = data.colorVideoUrl;
                $scope.videoDetails.resizedVideo = data.resizeVideoUrl;
            } else {
                toastr.error( data.message, 'Error');
            }
        })
    }

});