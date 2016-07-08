/**
 * Created by Raphson on 6/28/16.
 */
var app = angular.module('yourstube', ['ngCookies', 'ngRoute', 'ngStorage', 'ngMessages', 'angularMoment','angular-loading-bar',
    'ui.bootstrap', 'toastr', 'ngSanitize', 'ngLodash', 'satellizer', 'cloudinary',
    'angularUtils.directives.dirDisqus', 'appRoutes'])
    .config(['cfpLoadingBarProvider', '$httpProvider','$authProvider', 'cloudinaryProvider', function(cfpLoadingBarProvider, $httpProvider, $authProvider, cloudinaryProvider){

        $authProvider.baseUrl = '/';
        $authProvider.loginUrl = '/api/login';
        $authProvider.signupUrl = '/api/register';
        $authProvider.authHeader = 'Authorization';
        $authProvider.authToken = 'Bearer';
        $authProvider.storageType = 'localStorage';


        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;

        cloudinaryProvider.set("cloud_name", "unicodeveloper").set("upload_preset", "b9ej8dr5");
    }]);