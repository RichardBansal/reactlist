// $(".leaderbox > a > div")[0]

var request = require('request');
var cheerio = require('cheerio');
var bluebird = require('bluebird');
var fs = require('fs');

bluebird.promisifyAll(request); //now all request functions have an Async function
bluebird.promisifyAll(fs);

//function (error, response, body) multiple promises are created in an array, you need to response or body
var promise = request.getAsync('https://reddit.com')

console.log(promise);

promise.get(1).then(fulfilled);

function fulfilled(htmlBody){
	var $ = cheerio.load(htmlBody);
	var result = "["
	// var arrOfTitles = 
	// console.log(arrOfTitles);
	console.log('testing');
	$('.title.may-blank').each(function(i,title){
		result += JSON.stringify(
							{title:($(this).text())}
						) + ",";
		console.log(title);
	});
	result += "]"
	fs.writeFileAsync('test.txt',result).then(doneWriting)
		function doneWriting(response){
			console.log('Done Writing');
	}
	// arrOfTitles.forEach(function(title){
	// 	console.log($(title).text());
	// });
	// console.log(result);
}



// write to json for future use
//div class ="leaderbox"