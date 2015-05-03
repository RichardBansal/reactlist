/**
 * Created by ram on 15-05-03.
 */
// $(".leaderbox > a > div")[0]
//TODO: not complete, just used jQuery to grab filter data
//y =$('.filter')[1]
//$(y).each(function() {
//    arr.push($(this).children());
//});
//    arr[0][0]

//x.forEach(function(item,index){
// if(index!==0 && index!==x.length-1)
//  {
//      console.log($('this'))
//    }
// });
//x = Array.prototype.slice.call(arr[0]) - convert to an array
//$(item).attr('data-filter-max'))
//$(arr[0][0]).text()
//    {filterName:text,filterValues:[]}

//TODO: Below code works, build into a scrapper
//grabDataFilters = Array.prototype.slice.call($('.filter').slice(1,$('.filter').length));
//var filterArr = [];
//grabDataFilters.forEach(function(nonFilterArr){
//    //console.log(nonFilterArr);
//    filterArr.push(Array.prototype.slice.call(nonFilterArr));
//});
//
//var maxFilterArr = [];
//filterArr.forEach(function(filter){
//    var filterObj = {
//        filterName:$(filter[0]).text()
//    }
//    var optionsArr = [];
//    if($(filter[1]).attr('data-filter-max')){
//        filter.forEach(function(option,index){
//            if(index>0 && index<filter.length-1)
//            {
//                optionsArr.push($(option).attr('data-filter-max'));
//            }
//        });
//        filterObj.filterValues = optionsArr;
//        maxFilterArr.push(filterObj);
//    }
//});
//
//maxFilterArr.forEach(function(filter){
//    console.dir(filter);
//});

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