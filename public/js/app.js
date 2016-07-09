/**
 * Created by Raphson on 6/28/16.
 */
var app = angular.module('yourstube', ['ngCookies', 'ngRoute', 'ngStorage', 'ngMessages', 'angularMoment','angular-loading-bar',
    'ui.bootstrap', 'toastr', 'ngSanitize', 'ngLodash', 'satellizer', 'cloudinary', 'ngFileUpload', 'mwl.confirm',
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

        cloudinaryProvider.set("cloud_name", "iamraphson").set("upload_preset", "dloyv1pjb");
    }]);