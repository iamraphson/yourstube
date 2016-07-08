/**
 * Created by Raphson on 7/8/16.
 */
app.factory('Video', function($http){
    return {
        create: function(videoDetails, cb){
            $http.post('/api/videos/create', videoDetails).then(function(response){
              if(response.data.success){
                cb(true, response.data);
              } else {
                cb(false, response.data);
              }
            })
        },

        fetchAll: function(){
          $http.get('/api/videos');
        }
    }
});
