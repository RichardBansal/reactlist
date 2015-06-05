var _ = require('lodash'),
    Dispatcher = require('../dispatcher'),
    EventEmitter = require('events').EventEmitter,
    CityStore = new EventEmitter(),
    citydata,
    filterText,
    selectedOptions,
    filters,
    filteredCityData, //based off of search results
    DataFilters,
    Links;

DataFilters = [
    {filterName: "data-long-term-cost", filterData: ["500","1000","1500","2000","3000","5000"]},
    {filterName: "data-apartment-cost", filterData: ["125","250","500","1000","2000"]},
    {filterName: "data-hotel-price", filterData: ["3","5","10","25","50"]},
    {filterName: "data-nomadcost", filterData: ["500","1000","1500","2000","3000","5000"]}
];
Links = ["Cities", "Forum", "Chat", "Guides", "Remote Jobs", "Meetups", "Stories", "Signup"];

CityStore.getCityData = () => citydata;
CityStore.getFilterText = () => filterText;
CityStore.getSelectedOptions = () => selectedOptions;
CityStore.getFilters = () => filters;
CityStore.getFilteredCityData = () => filteredCityData;
CityStore.getDataFilters = () => DataFilters;

var _updateSelectedOptions = (filter,value) => {
    var i = _.findIndex(selectedOptions,(item)=>{
        return item.filter === filter;
    });
    if(i!==-1){
        selectedOptions[i].value = value;
    } else {
        if(!selectedOptions) selectedOptions = [];
        selectedOptions.push({
            filter,
            value
        });
    }
};

var _updateFilterCityData = () => {
    var tempArr, result;
    filteredCityData = citydata.filter((city)=>{
        if(filterText && selectedOptions){
            tempArr = Array.prototype.slice.call(selectedOptions);
            result = tempArr.every((filterObj)=>{
                return (parseInt(city[filterObj.filter]) < filterObj.value);
            });
            return result && city['data-name'].indexOf(filterText) !== -1;
        } else if(selectedOptions){
            tempArr = Array.prototype.slice.call(selectedOptions);
            return tempArr.every((filterObj)=>{
                return (parseInt(city[filterObj.filter]) < filterObj.value);
            });
        } else {
            return city['data-name'].indexOf(filterText) !==-1;
        }
    });
    //console.log('_updateFilterCityData',filterText, selectedOptions);
};

CityStore.dispatcherIndex = Dispatcher.register((action)=>{
   switch(action.name){
     case 'CITY_DATA_LOADED':
           //console.log('CityStore.dispatcherIndex CITY_DATA_LOADED',action.citydata);
           citydata = action.citydata;
           filters = action.filters;
           CityStore.emit('change');
           break;
     case 'SEARCH_UPDATED':
            //console.log('CityStore.dispatcherIndex SEARCH_UPDATED',action.search);
            filterText = action.search;
            _updateFilterCityData();
            CityStore.emit('change');
            break;
     case 'DROPDOWN_UPDATED':
            //console.log('CityStore.dispatcherIndex DROPDOWN_UPDATED',action.filter,action.value);
            _updateSelectedOptions(action.filter,action.value);
            _updateFilterCityData();
            CityStore.emit('change');
            break;
     default:
           break;
   }
});

module.exports = CityStore;