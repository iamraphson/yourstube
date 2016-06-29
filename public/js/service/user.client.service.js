/**
 * Created by Raphson on 6/29/16.
 */
app.factory('userService', function($http){
    return {
        getProfile: function () {
            return $http.get('/api/me');
        },
        updateProfile: function(profileData){
            return $http.put('/api/me', profileData);
        }
    }
});