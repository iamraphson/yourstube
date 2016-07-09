/**
 * Created by Raphson on 7/8/16.
 */
var video = require('../models/video.server.model');
var upload = require('./Upload.server.controller');

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
            if(err) {
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json(videos)
        });
    },

    /**
     * fetch all uploaded video by current logged in user
     * @param req
     * @param res
     * @return {object}
     */
    retrieveAllByUserId: function(req, res){
        video.find({uploaded_by :req.user}, function(err, videos){
            if(err) {
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({success: true, videos: videos});
        });
    },


    /**
     * fetch video details by public ID
     * @param req
     * @param res
     * @return {object}
     */
    retrieveVideoByPublicId: function(req, res){
        var publicId = req.params.public_id;
        video.findOne({public_id : publicId}, function(err, video){
            if(err) {
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({success: true, video: video});
        });
    },

    /**
     * Update video details
     * @param req
     * @param res
     */
    updateVideoDetails: function(req, res){
        var publicId = req.params.public_id;
        var videoDetails = req.body;

        upload.tagVideos(req, res);
        var resizeVideoUrl = upload.resizeVideo(req, res);


        if(req.body.audio){
            var newVideoUrl = upload.removeAudio(req, res);
        }

        if(req.body.videoBackground) {
            var coloredVideoUrl = upload.changeBackground(req, res);
        }
        console.log(videoDetails);

        video.update({public_id : publicId}, videoDetails, function (err) {
            if(err) {
                return res.status(404).json({success: false, message: 'User Details Not Found', err: err});
            } else {
                return res.status(200)
                    .json({
                        success: true,
                        message: 'Update Successful',
                        audioUrl: newVideoUrl,
                        colorVideoUrl: coloredVideoUrl,
                        resizeVideoUrl: resizeVideoUrl
                    });
            }
        });
    }
}