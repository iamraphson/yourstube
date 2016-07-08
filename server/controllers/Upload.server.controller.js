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
    }
}