/**
 * Created by Raphson on 6/28/16.
 */
app.controller('NavbarCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };
});