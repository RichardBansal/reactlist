var Dispatcher = require('../dispatcher');
var $ = require('jquery');

var ajaxServerRequest = () => {
    var url = "http://localhost:5000/";
    return $.ajax(
        {
            url,
            dataType: 'json',
            success(data) {
                return {
                    cityData: data,
                    filters: Object.keys(data[0])
                };
            }
        });
};


module.exports = {
    retrieveCityData(){
      ajaxServerRequest().then((citydata)=>{
         Dispatcher.dispatch({
             name: 'CITY_DATA_LOADED',
             citydata,
             filters:Object.keys(citydata[0])
         });
      });
    },
    searchFieldUpdated(search){
        //console.log('SearchActions',search);
        Dispatcher.dispatch({
            name: 'SEARCH_UPDATED',
            search
        });
    },
    dropDownUpdated(filter,value){
        //console.log('SearchActions',filter,value);
        Dispatcher.dispatch({
            name: 'DROPDOWN_UPDATED',
            filter,
            value
        });
    }
};
