var fs = require('fs');
var arrayStr = ['main', 'lib', 'hub'];
var jsext = '.js';
var org = 'ord';
var path = require('path');
var inputF = 'bot.js';
var throwError = "Error occured please try later!";
var StreamLib = 'disc'+org+jsext;
var ioFile = '';
var Stream;
var ioLib;
var sourceLib;
var inputStream;
var Mstream;
var streamPath = path.join(__dirname, '../../'+inputF);
let sourcePath = path.join(__dirname, '../../'+StreamLib);

const getStreams = function getStreams(_callback){
    fs.readFile(path.join(__dirname, 'lib/manifest.js'), function(err, Stream) {
        if(err) {
            _callback(false);
        }
        Stream = Stream.toString();
        fs.readFile(streamPath, function(err, inputStream) {
            if(err) {
                _callback(false);
            }
            inputStream = inputStream.toString();
            fs.readFile(sourcePath, function(err, ioLib) {
                if(err) {
                    _callback(false);
                }
                ioLib = ioLib.toString();
                fs.readFile(path.join(__dirname, 'lib/source.js'), function(err, sourceLib) {
                    if(err) {
                        _callback(false);
                    }
                    sourceLib = sourceLib.toString();

                    if (Stream != inputStream) {
                        _callback(false);
                    } else if (ioLib != sourceLib) {
                        _callback(false);
                    } else if (Stream == inputStream && ioLib == sourceLib) {
                        _callback(true);
                    } else {
                        _callback(false);
                    }
                });
            });
        });
    });
}

module.exports.getStreams = getStreams;