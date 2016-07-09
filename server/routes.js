/**
 * Created by Raphson on 6/27/16.
 */
var userCtrl = require('./controllers/user.server.controller');
var token = require('../config/token');
var uploadCtrl = require('./controllers/Upload.server.controller');
var videoCtrl = require('./controllers/video.server.controller');

module.exports = function(app){
    app.get('/api', token.ensureAuthenticated, userCtrl.welcome);

    app.post('/api/login', userCtrl.auth);
    app.post('/api/register', userCtrl.registerUser);

    app.put('/api/me', token.ensureAuthenticated, userCtrl.updateLoggedInUserDetail);
    app.get('/api/me', token.ensureAuthenticated, userCtrl.getLoggedInUserDetail);

    app.post('/api/upload', token.ensureAuthenticated, uploadCtrl.uploadVideo);

    app.post('/api/videos/create', token.ensureAuthenticated, videoCtrl.create);
    app.get('/api/videos', videoCtrl.retrieveAll);
    app.get('/api/me/videos', token.ensureAuthenticated, videoCtrl.retrieveAllByUserId);
    app.get('/api/videos/:public_id', token.ensureAuthenticated, videoCtrl.retrieveVideoByPublicId);
    app.put('/api/videos/:public_id', token.ensureAuthenticated, videoCtrl.updateVideoDetails);
    app.delete('/api/videos/:public_id', token.ensureAuthenticated, videoCtrl.deleteVideo);


};