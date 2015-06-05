var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    LeftNav = mui.LeftNav,
    DropDownMenu = mui.DropDownMenu,
    Paper = mui.Paper,
    CityStore = require('../../stores'),
    CityActions =  require('./../../actions'),
    FilterDropDown = require('./filterdropdown'),
    FilterInput = require('./filterinput');

var FilterItems = React.createClass({
    //loadFiltersFromServer(){
    //    ajaxServerRequest().then(fulfilled);
    //    var self = this;
    //    function fulfilled(response){
    //        var filters = Object.keys(response[0]);
    //        filters.length = 10;
    //        self.setState({filters:filters});
    //    }
    //},
    getInitialState() { //these are filters being loaded, not selected
        return {filters:[]};
    },
    componentDidMount(){
        //this.loadFiltersFromServer();
        var self = this;
        CityActions.retrieveCityData();
        CityStore.on('change',()=> {
            self.setState({filters:CityStore.getFilters()});
        });
    },
    handleUserInput(filterText,selectedOption) {
        this.props.onUserInput(filterText, selectedOption);
    },
    render(){

        //TODO: Use a slider to for a more granular change
        //TODO: Drop down menu must match the correct state
        //TODO: State representation of selected filters
        //TODO: How to handle showing all selectedOptions
        return (
            <div className="FilterItems">
                <FilterInput
                    filterText={this.props.filterText}
                    onUserInput={this.handleUserInput}
                    />
                <FilterDropDown
                    selectedOptions={this.props.selectedOptions}
                    onUserInput={this.handleUserInput}
                    />
            </div>
        );
    }
});

module.exports = FilterItems;