/**
 * Created by Raphson on 6/27/16.
 */
var cloudinary = require("cloudinary");
var token = require("../../config/secrets");
var user = require('../models/user.server.model');
var gravatar = require('gravatar');
var token = require('../../config/token');

module.exports = {


    welcome : function(req,res){
        return res.status(200).json({message : "Welcome to YOURSTUBE API"});
    },

    registerUser : function(req, res){
        user.findOne({email : req.body.email}, 'password', function(err, existingUser){
            if(existingUser){
                return res.status(409).json({message : "Email is already taken"});
            }

            var secureImageUrl = gravatar.url(req.body.email, {s: '200', r: 'x', d: 'retro'}, true);

            var newUser = new user({
                fullName : req.body.fullName,
                email : req.body.email,
                password : req.body.password,
                user_avatar : secureImageUrl
            });

            newUser.save(function(err, result){
                if(err){
                    res.json({message: err.message}).status(500)
                } else {
                    res.send({token : token.createJWT(result)});
                }
            })
        })
    },

    /*
    *get current logged in user details
    *@param req
    * @param res
    * @return Void
    *
     */
    getLoggedInUserDetail : function(req, res){
        user.findById(req.user, function(err, user1){
            res.send(user1);
        })
    },

    /*
    *Authenticate a user using Email and password
    * @param req
    * @param res
    * @return json
     */

    auth : function(req, res){
        user.findOne({email : req.body.email}, function(err, loginUser){
           if(!loginUser){
               res.json({message : "Invalid Email"}).status(401);
           }

            loginUser.comparePassword(re.body.passwrod, function(err, isMatch){
                if(!isMatch){
                    res.json({message : "Invalid Password"}).status(401);
                }

                res.send({token : token.createJWT(loginUser)});
            })
        });
    },

    updateLoggedInUserDetail: function(req, res){
        user.findById(req.user, function(err, user1){
            if(user1)
                return res.json(400).send({message: "User Not Found"});

            user1.fullName = req.body.fullName || user1.fullName;

            user.email = req.body.email || user1.email;

            user1.save(function(err){
                return res.json(200).send({message: "Profile Update Successfully"});
            })
        })
    }



}
