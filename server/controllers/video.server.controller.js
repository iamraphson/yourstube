/**
 * Created by Raphson on 7/8/16.
 */
var video = require('../models/video.server.model');

module.exports = {

    /**
     * @param {void }req
     * @param {void} res
     * @return {object}
     */
    create: function(req, res){
        var newVideo = new video({
            title: req.body.title,
            public_id: req.body.public_id,
            description: req.body.description,
            url: req.body.url,
            duration: req.body.duration,
            format: req.body.format,
            width: req.body.width,
            height: req.body.height,
            uploaded_by: req.user
        });

         newVideo.save(function(err, result){
             if(err){
                 return res.status(500).json({message: err.message});
             }
             return res.status(200).json({success: true, message: "Video Published Successfully!"});
         });

    },

    /**
     *  fetch all videos in Database
     * @param req
     * @param res
     * @return {object}
     */
    retrieveAll: function(req, res){
        video.find({}, function(err, videos){
            return res.status(200).json(videos)
        });
    }
}