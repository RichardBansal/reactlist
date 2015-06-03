//REF:https://magic.import.io/
//ASK: Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of FilterItems. See http://fb.me/react-warning-keys for more information.
console.log('App starting');
var React = require('react');
var $ = require('jquery');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var Paper = mui.Paper;
var LeftNav = mui.LeftNav;
var DropDownMenu = mui.DropDownMenu;
var {Container,Block} = require('react-flexgrid');
var SelectedView = require('./components/view/selectedview.js');
var FilterMenu = require('./components/filter/filtermenu.js');

var Links = ["Cities", "Forum", "Chat", "Guides", "Remote Jobs", "Meetups", "Stories", "Signup"];

var DataFilters = [
    {filterName: "data-long-term-cost", filterData: ["500","1000","1500","2000","3000","5000"]},
    {filterName: "data-apartment-cost", filterData: ["125","250","500","1000","2000"]},
    {filterName: "data-hotel-price", filterData: ["3","5","10","25","50"]},
    {filterName: "data-nomadcost", filterData: ["500","1000","1500","2000","3000","5000"]}
];

var FilterableView = React.createClass({
    getInitialState(){
        return {
            filterText: '',
            selectedOptions: []
        };
    },
    handleUserInput(filterText, selectedOption){
        var updatedSelectedOptions = this.state.selectedOptions || [];
        console.log('FilterableView - handleUserInput',filterText, selectedOption);
        //TODO: You need to manage options changed for the same filter
        var wasReplaced = false;
        //TODO: Bug where when you change the search, you erase the selectedOptions
        if(selectedOption){
            updatedSelectedOptions.forEach(function(options,index){
                if(options.filter === selectedOption.filter){
                    options.value = selectedOption.value;
                    wasReplaced = true;
                    return;
                }
            });
            if(!wasReplaced){
                updatedSelectedOptions.push(selectedOption);
            }
        }
        console.log('115 - before state change, current state', this.state);
        filterText = filterText || '';
        this.setState({
            filterText: filterText.length > 0 ? filterText : '',
            selectedOptions: updatedSelectedOptions || this.state.selectedOptions
        });
    },
    render(){
        return (
            <div className="grid module">
                <div className="col-2-3">
                    <div className="module">
                        <SelectedView
                            filterText={this.state.filterText}
                            selectedOptions={this.state.selectedOptions}/>
                    </div>
                </div>
                <div className="col-1-3">
                    <div className="module">
                        <FilterMenu
                            filterText={this.state.filterText}
                            selectedOptions={this.state.selectedOptions}
                            onUserInput={this.handleUserInput}
                            />
                    </div>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
	render(){
		// console.log(filters);
		//<NavBar/> TODO: Temp removed
		return (
				<div>
					<FilterableView/>
				</div>
			);
	}
});

React.render(<App/>,document.getElementById('content'));

