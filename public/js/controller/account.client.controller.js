/**
 * Created by Raphson on 6/29/16.
 */
app.controller('ProfileController', function($scope, userService, toastr){

    $scope.getProfile = function(){
        userService.getProfile()
            .then(function(response){
                $scope.user = response.data;
            })
            .catch(function(response) {
                toastr.error(response.data.message, response.status);
            });
    };

    $scope.updateProfile = function(){
        userService.updateProfile( $scope.user)
            .then(function(response){
                toastr.success('Profile has been updated');
            })
            .catch(function(response){
                toastr.error(response.data.message, response.status);
            });
    };

    $scope.getProfile();
});