/**
 * Created by Raphson on 7/1/16.
 */
app.controller('UploadController', function($scope, $rootScope, $location, $http, Upload, Video, toastr){

    $scope.uploadFiles = function(files){
        $scope.files = files;
        if (!$scope.files) return;
        angular.forEach(files, function(file){
            if (file && !file.$error) {

                file.upload = Upload.upload({
                    url: "/api/upload",
                    method: "POST",
                    data: {
                        file: file
                    }
                }).progress(function (e) {
                    file.status = "Uploading...";
                    file.progress = Math.round((e.loaded * 100.0) / e.total);
                }).success(function (data, status, headers, config) {
                    file.status = "Done...100%.. Draft Saved! Now, Hit the Publish Button to go live when you are ready";
                    console.log(data);
                    file.result = data;
                    var details = {
                      title: $scope.video.title,
                      public_id: data.response.public_id,
                      description: $scope.video.description,
                      url: data.response.url,
                      duration: data.response.duration,
                      format: data.response.format
                    };

                    Video.create(details, function(status, data){
                        if(data.success){
                            $scope.video.title = '';
                            $scope.video.description = '';
                            toastr.success(data.message, {timeOut: 3000});
                        } else {
                            toastr.error(data.message, 'Error', {timeOut: 3000});
                        }
                    });

                    file.status = "Your Video is live now!";

                }).error(function (data, status, headers, config) {
                    file.result = data;
                });
            }
        });
    };

    /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
        var items = $event.dataTransfer.items;
        var hasFile = false;
        if (items !== null) {
            for (var i = 0 ; i < items.length; i++) {
                if (items[i].kind == 'file') {
                    hasFile = true;
                    break;
                }
            }
        } else {
            hasFile = true;
        }
        return hasFile ? "dragover" : "dragover-err";
    };
});
