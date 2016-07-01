/**
 * Created by Raphson on 6/27/16.
 */
var userCtrl = require('./controllers/user.server.controller');
var token = require('../config/token');
var uploadCtrl = require('./controllers/Upload.server.controller');

module.exports = function(app){
    app.get('/api', token.ensureAuthenticated, userCtrl.welcome);

    app.post('/api/login', userCtrl.auth);
    app.post('/api/register', userCtrl.registerUser);

    app.put('/api/me', token.ensureAuthenticated, userCtrl.updateLoggedInUserDetail);
    app.get('/api/me', token.ensureAuthenticated, userCtrl.getLoggedInUserDetail);

    app.post('/api/upload', token.ensureAuthenticated, uploadCtrl.uploadVideo);
};