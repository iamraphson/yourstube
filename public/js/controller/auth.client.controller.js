/**
 * Created by Raphson on 6/28/16.
 */
app.controller('AuthController', function($scope, $auth, $location, toastr){
    $scope.login = function(){
        $auth.login($scope.user)
            .then(function() {
                toastr.success('You have successfully signed in!');
                $location.path('/');
            })
            .catch(function(error) {
                console.log(error);
                toastr.error(error.data.message, error.status);
            });
    };

    $scope.signup = function(){
        $auth.signup($scope.user)
            .then(function(response) {
                $auth.setToken(response);
                toastr.info('You have successfully created a new account and have been signed-in');
                $location.path('/');
            })
            .catch(function(response) {
                console.log(response);
                toastr.error(response.data.message);
            });
    };
});

app.controller('LogoutController', function($location, $auth, toastr){
    if (!$auth.isAuthenticated()) { return; }

    $auth.logout().then(function() {
        toastr.info('You have been logged out');
        $location.path('/');
    });
});