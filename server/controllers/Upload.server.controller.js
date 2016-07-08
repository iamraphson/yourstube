/**
 * Created by Raphson on 7/1/16.
 */
var cloudinary = require('cloudinary');
var multiparty = require('multiparty');

module.exports = {

    uploadVideo: function(req, res){
        var fileName = '';
        var size = '';
        var form = new multiparty.Form();

        form.on('error', function(err){
            console.log('Error Parsing Form: ' + err.stack);
        });
        form.on('part', function(part){
            if(!part.fileName){
                return;
            }

            fileName = part.fileName;
            size = part.byteCount;
        });
        form.on('file', function(name, file){
            cloudinary.uploader.upload(file.path, function(response){
                return res.json({response: response});
            }, {resource_type: 'video', chunk_size: 10000000});
        });
        form.on('close', function(){
            console.log("uploaded!!");
        });
        form.parse(req);
    },

    tagVideos: function(req, res){
        var tag = req.body.tag;
        var publicId = req.params.public_id;

        cloudinary.uploader.add_tag(tag, [publicId], function(response){
            console.log("Add Tags response -> " + response);
        }, { resource_type: "video" });
    },

    removeAudio: function(req, res){
        var videoUrl = req.body.url;
        var publicId = req.params.public_id;
        var format = req.body.format;

        var response = videoUrl.split("upload")[0].concat("upload/ac_none/" + publicId + "." + format );
        console.log("Remove Audio response -> " + response);
        return response;

    },

    changeBackground: function(req, res){
        var videoUrl = req.body.url;
        var publicId = req.params.public_id;
        var format = req.body.format;
        var color = req.body.videoBackground || "yellow";

        var response = videoUrl.split("upload")[0].concat("upload/w_300,h_300,c_pad,b_" + color + "/" + publicId + "." + format );
        console.log("Change BG response -> " + response);
        return response;
    }
}