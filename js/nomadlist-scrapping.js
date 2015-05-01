// $(".leaderbox > a > div")[0]

var request = require('request');
var cheerio = require('cheerio');
var bluebird = require('bluebird');
var fs = require('fs');

bluebird.promisifyAll(request); //now all request functions have an Async function
bluebird.promisifyAll(fs);

//function (error, response, body) multiple promises are created in an array, you need to response or body
console.log('making request');
var promise = request.getAsync('https://nomadlist.com')
// console.log(promise);
promise.get(1).then(fulfilled);

function fulfilled(htmlBody){
	var $ = cheerio.load(htmlBody);
	var result = "[";
	// var arrOfTitles = 
	// console.log(arrOfTitles);
	
	var cityData = $(".leaderbox > a > div") //.slice(0,10);
	//'.title.may-blank'
	// arr = arr.slice(0,2);
	
	// arr.forEach(function(city){
	cityData = Array.prototype.slice.apply(cityData);
	// console.log(arr[0].attribs["data-nomads-here"], Array.isArray(arr));
	cityData.forEach(function(city){
		// console.log(city.attribs);
		result += JSON.stringify(city.attribs) + ","
	});
	// });
	// arr.forEach(function(city,index){
		// if(index === 0){ console.log(city)}
	// })
	
	// $(arr).each(function(index,div){
		// result += JSON.stringify(
							// {title:($(this).text())}
						// ) + ",";
		// console.log(title);
	// });
	result += "]";

	fs.writeFileAsync('cityData.json',result).then(doneWriting)
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