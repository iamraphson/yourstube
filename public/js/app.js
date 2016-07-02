/**
 * Created by Raphson on 6/28/16.
 */
var app = angular.module('yourstube', ['ngCookies', 'ngRoute', 'ngStorage', 'ngMessages', 'angularMoment', 'cloudinary','angular-loading-bar',
    'ui.bootstrap', 'toastr', 'ngFileUpload', 'ngSanitize', 'ngLodash', 'satellizer',
    'angularUtils.directives.dirDisqus', 'appRoutes'])
    .config(['cfpLoadingBarProvider', '$httpProvider','$authProvider', function(cfpLoadingBarProvider, $httpProvider, $authProvider){

        $authProvider.baseUrl = '/';
        $authProvider.loginUrl = '/api/login';
        $authProvider.signupUrl = '/api/register';
        $authProvider.authHeader = 'Authorization';             
        $authProvider.authToken = 'Bearer';
        $authProvider.storageType = 'localStorage';


        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;

        //cloudinaryProvider.set("cloud_name", "unicodeveloper").set("upload_preset", "b9ej8dr5");
    }]);