/**
 * Created by Raphson on 6/27/16.
 */
var userCtrl = require('./controllers/user.server.controller');

module.exports = function(app){
    app.get('/api', userCtrl.welcome);

    app.post('/api/login', userCtrl.auth);
    app.post('/api/register', userCtrl.registerUser);

    app.put('/api/me', userCtrl.updateLoggedInUserDetail);
    app.get('/api/me', userCtrl.getLoggedInUserDetail)
};