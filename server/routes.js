/**
 * Created by Raphson on 6/27/16.
 */
var userCtrl = require('./controllers/user.server.controller');
var token = require('../config/token');

module.exports = function(app){
    app.get('/api', token.ensureAuthenticated, userCtrl.welcome);

    app.post('/api/login', userCtrl.auth);
    app.post('/api/register', userCtrl.registerUser);

    app.put('/api/me', token.ensureAuthenticated, userCtrl.updateLoggedInUserDetail);
    app.get('/api/me', token.ensureAuthenticated, userCtrl.getLoggedInUserDetail)
};