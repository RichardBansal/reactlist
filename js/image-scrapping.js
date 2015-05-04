////TODO:
//var x = $(".leaderbox > a > div > div");
//var y = x.slice(0,11);
//$(x).attr('style');
//
//var y = x.slice(0,11);
//var newX = Array.prototype.slice.call(100);
//var imageUrl = [];
//newX.forEach(function(imageTag){
//    imageUrl.push('https://nomadlist.com/' + $(imageTag).attr('style'));
//});

var request = require('request');
var cheerio = require('cheerio');
var bluebird = require('bluebird');
var fs = require('fs');

bluebird.promisifyAll(request); //now all request functions have an Async function
bluebird.promisifyAll(fs);

console.log('making request');
var promise = request.getAsync('https://nomadlist.com')
promise.get(1).then(fulfilled);

function fulfilled(htmlBody){
    var $ = cheerio.load(htmlBody);
    var result = "";

    var imageData = $(".leaderbox > a > div > div");
    //curl -o 01_Intro.mp4 https://embed-ssl.wistia.com/deliveries/53dd82ab9a8d214e2d5b7836bd176d5035c9d68f/file.mp4
    imageData = Array.prototype.slice.apply(imageData);
    imageData.forEach(function(imageTag){
        //TODO: correct result to be :
        //curl -o kampala-uganda.jpg https://nomadlist.com/assets/cities/500px/kampala-uganda.jpg
        result += 'curl -o' + ' https://nomadlist.com/' + $(imageTag).attr('style') + '\n';
    });

    fs.writeFileAsync('image.sh',result).then(doneWriting)
    function doneWriting(response){
        console.log('Done Writing');
    }
}



// write to json for future use
//div class ="leaderbox"