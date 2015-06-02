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
var SelectedView = require('./components/selectedview.js');
var FilterMenu = require('./components/filtermenu.js');

var Links = ["Cities", "Forum", "Chat", "Guides", "Remote Jobs", "Meetups", "Stories", "Signup"];

var DataFilters = [
    {filterName: "data-long-term-cost", filterData: ["500","1000","1500","2000","3000","5000"]},
    {filterName: "data-apartment-cost", filterData: ["125","250","500","1000","2000"]},
    {filterName: "data-hotel-price", filterData: ["3","5","10","25","50"]},
    {filterName: "data-nomadcost", filterData: ["500","1000","1500","2000","3000","5000"]}
];

var FilterableView = React.createClass({
    getInitialState: function(){
        return {
            //straight text debounce search
            filterText: '',
            //TODO: Include more search options from cityData.json
            //{filter:optionSelected}
            selectedOptions: [] //TODO: Include option for added multiple Options, only one value right now
            //TODO: Should selectedOptions be an object, for easy replace?
        };
    },
    handleUserInput: function(filterText, selectedOption){
        console.log('58 - handleUserInput',filterText, selectedOption);
        //this.state.selectedOptions
        //	= (selectedOption ?
        //		this.state.selectedOptions.push(selectedOption):
        //		this.state.selectedOptions);
        //TODO: You need to manage options changed for the same filter
        //if(updatedSelectedOptions.indexOf(selectedOption))
        var wasReplaced = false;
        //TODO: Bug where when you change the search, you erase the selectedOptions
        if(selectedOption){
            var updatedSelectedOptions = this.state.selectedOptions || [];
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
        //if(selectedOptions.length==0){
        //    selectedOptions.push(selectedOption);
        //} testing123
        //var tempStateArr = this.state.selectedOptions;
        //console.log('77',Array.isArray(tempStateArr));
        //if(!selectedOption)
        //this.setState({
        //    filterText: filterText,
        //    selectedOptions: updatedSelectedOptions
        //});
        //TODO: Last character is not being recorded in state
        //TODO: This creates bug: Just noticed a bug ‘Kin’ shouldn’t show ‘Kot’….lol


        //selectedOption
        //filterText

        //this.state.filterText = filterText.length > 0 ? filterText : '';
        //this.state.selectedOptions = updatedSelectedOptions || this.state.selectedOptions;

        console.log('115 - before state change, current state', this.state);
        filterText = filterText || '';
        //console.log('117',!!this.state.filterText,!!selectedOption);
        this.setState({
            filterText: filterText.length > 0 ? filterText : '',
            selectedOptions: updatedSelectedOptions || this.state.selectedOptions
        });
        //if((!selectedOption)&&(filterText.length > 0)){
        ////this.setState({
        ////	filterText: filterText,
        ////});
        //    console.log('1',filterText)
        //    this.setState({
        //        filterText: filterText//,
        //        //selectedOptions: updatedSelectedOptions
        //    });
        //    console.log('123.handleUserInput.setState',this.state);
        //} else if (filterText.length === 0 && selectedOption){
        ////this.setState({
        ////	selectedOptions: this.state.selectedOptions.push(selectedOption)
        ////});
        //    this.setState({
        //        filterText: '',
        //        selectedOptions: updatedSelectedOptions
        //    });
        //    console.log('123.handleUserInput.setState',this.state);
        //} else {
        ////this.setState({
        ////	filterText: filterText,
        ////	selectedOptions: this.state.selectedOptions.push(selectedOption)
        ////});
        //    console.log('3',filterText)
        //    this.setState({
        //        filterText: '',
        //        selectedOptions: updatedSelectedOptions
        //    });
        //    console.log('123.handleUserInput.setState',this.state);
        //}

        //console.log('123.handleUserInput.setState',this.state);
    },
    render: function(){
        //console.log('95-FilterableView Render',this.state);
        //<h1>Hello World</h1>
        //console.log('82 - rendering FilterableView',this.state);
        return (
            <div className="grid module">
                <div className="col-2-3">
                    <div className="module">
                        <SelectedView
                            filterText={this.state.filterText}
                            selectedOptions={this.state.selectedOptions}
                            />
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
        )
    }
});

var App = React.createClass({
	render: function(){
		// console.log(filters);
		//<NavBar/> TODO: Temp removed
		return (
				<div>
					<FilterableView/>
				</div>
			)
	}
});

React.render(<App/>,document.getElementById('content'));