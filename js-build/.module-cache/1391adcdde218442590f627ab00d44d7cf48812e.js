//REF:https://magic.import.io/
//ASK: Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of FilterItems. See http://fb.me/react-warning-keys for more information.
console.log('App started');

var ajaxServerRequest = function(){
	url = "http://localhost:5000/";
	console.log('request data');
	return $.ajax(
			{
				url:url,
				dataType: 'json',
				success: function(data)
				{
					data.length = 10;
					var dataObj = {
						cityData:data,
						filters:Object.keys(data[0])
					};
					//console.log('data received+manipulated', dataObj);
					return dataObj;
				}
			});
};

var Links = ["Cities", "Forum", "Chat", "Guides", "Remote Jobs", "Meetups", "Stories", "Signup"];

var AppartmentCostRange = [125,250,500,1000,2000];

var NavBar = React.createClass({displayName: "NavBar",
	render: function(){
		var NavBar = Links.map(function(link){
			return (React.createElement("li", null, link)
				)
		});
		return (
			React.createElement("div", {className: "NavBar"}, 
				React.createElement("h1", null, "Navigation"), 
				React.createElement("ul", null, 
					NavBar
				)
			)
			) 
	}
});

var FilterableView = React.createClass({displayName: "FilterableView",
	getInitialState: function(){
		return {
			//straight text debounce search
			filterText: '',
			//TODO: Include more search options from cityData.json
			//{filter:optionSelected}
			selectedOptions: undefined //TODO: Include option for added multiple Options, only one value right now
            //TODO: Should selectedOptions be an object, for easy replace?
		}
	},
	handleUserInput: function(filterText, selectedOption){
		console.log('58 - handleUserInput',filterText, selectedOption);

		//this.state.selectedOptions
		//	= (selectedOption ?
		//		this.state.selectedOptions.push(selectedOption):
		//		this.state.selectedOptions);
        //TODO: You need to manage options changed for the same filter
        //var updatedSelectedOptions = this.state.selectedOptions;
        //updatedSelectedOptions.push(selectedOption);
        //if(selectedOptions.length==0){
        //    selectedOptions.push(selectedOption);
        //}

        //if(!selectedOption)
        this.setState({
            filterText: filterText,
            selectedOptions: selectedOption//updatedSelectedOptions
        });

        //if(!selectedOption){
			//this.setState({
			//	filterText: filterText,
			//});
        //} else if (!filterText){
			//this.setState({
			//	selectedOptions: this.state.selectedOptions.push(selectedOption)
			//});
        //} else {
			//this.setState({
			//	filterText: filterText,
			//	selectedOptions: this.state.selectedOptions.push(selectedOption)
			//});
        //}
	},
	render: function(){
        //console.log('95-FilterableView Render',this.state);
		//<h1>Hello World</h1>
		//console.log('82 - rendering FilterableView',this.state);
		return (
			React.createElement("div", null, 
				React.createElement(FilterMenu, {
					filterText: this.state.filterText, 
					selectedOptions: this.state.selectedOptions, 
					onUserInput: this.handleUserInput}
				), 
				React.createElement(SelectedView, {
					filterText: this.state.filterText, 
					selectedOptions: this.state.selectedOptions}
				)
			)
		)
	}
});

    var FilterMenu = React.createClass({displayName: "FilterMenu",
        handleUserInput: function(filterText, selectedOption){
            this.props.onUserInput(filterText, selectedOption);
        },
        render: function(){
            return (
                React.createElement("div", {className: "FilterMenu"}, 
                    React.createElement(FilterViews, null), 
                    React.createElement(FilterItems, {
                        filterText: this.props.filterText, 
                        selectedOptions: this.props.selectedOptions, 
                        onUserInput: this.handleUserInput}
                    )
                )
                )
        }
    });
        var FilterViews = React.createClass({displayName: "FilterViews",
            render: function(){
                //TODO: Temp removed below
                //<h3>Filter Views</h3>
                //<ul>
                //<li>Grid View</li>
                //<li>List View</li>
                //<li>Map View</li>
                //<li>Settings View</li>
                //</ul>
                return (React.createElement("div", {className: "FilterViews"}))
            }
        });
        var FilterItems = React.createClass({displayName: "FilterItems",
            loadFiltersFromServer: function(){
                ajaxServerRequest().then(fulfilled);
                var self = this;
                function fulfilled(response){
                    var filters = Object.keys(response[0]);
                    filters.length = 10;
                    self.setState({filters:filters});
                }
            },
            getInitialState: function(){ //these are filters being loaded, not selected
                return {filters:[]};
            },
            componentDidMount: function(){
                this.loadFiltersFromServer();
            },
            handleUserInput: function(filterText,selectedOption){
                this.props.onUserInput(filterText, selectedOption);
            },
            render: function(){

                //TODO: Use a slider to for a more granular change
                //TODO: Drop down menu must match the correct state
                //TODO: State representation of selected filters
                //TODO: How to handle showing all selectedOptions
                return (
                    React.createElement("div", {className: "FilterItems"}, 
                            React.createElement(FilterInput, {
                                filterText: this.props.filterText, 
                                onUserInput: this.handleUserInput}
                                ), 
                            React.createElement(FilterOptions, {
                                selectedOptions: this.props.selectedOptions, 
                                onUserInput: this.handleUserInput}
                                )
                    )
                    )
            }
        });
            var FilterInput = React.createClass({displayName: "FilterInput",
                handleUserInput: function(){
                    this.props.onUserInput(
                        this.refs.filterTextInput.getDOMNode().value,
                        undefined
                    )
                },
                render: function(){
                    return (
                                React.createElement("input", {
                                type: "text", 
                                placeholder: "Search...", 
                                value: this.props.filterText, 
                                ref: "filterTextInput", 
                                onChange: this.handleUserInput}
                                )
                            )
                }
            });
            var FilterDropDown = React.createClass({displayName: "FilterDropDown",
                getInitialState: function(){
                    //TODO: YOU WERE WORKING HERE
                },
                handleUserInput: function(){
                    //are you getting the filter and the filter option
                    //wrap the option and the correct filter
                    console.log('205',this.refs.filterDropDown.getDOMNode().value);
                    //this.props.onUserInput(
                    //    undefined,
                    //    this.refs.filt erDropDown.getDOMNode().value
                    //)
                },
                render:function(){
                    var Selects = [];

                    for(var i = 0;i<1;i++){
                        Selects.push(
                            {i},
                            React.createElement("select", {
                                value: "Select", 
                                ref: "filterDropDown", 
                                key: i}, 
                                React.createElement(FilterOptions, {
                                    onChange: this.handleUserInput, 
                                    onUserInput: this.handleUserInput, 
                                    selectedOptions: this.props.selectedOptions})
                            ))
                    };

                    return (React.createElement("div", null, Selects))
                }
            });
                var FilterOptions = React.createClass({displayName: "FilterOptions",
                    getInitialState: function(){
                        return {
                            value: 'select'
                        }
                    },
                    //change: function(event){
                    //    console.log(event.target.value);
                    //    this.setState({value:event.target.value});
                    //
                    //},
                    handleUserInput: function(event){
                        console.log(event.target.value);
                        this.setState({value:event.target.value});
                        this.props.onUserInput(undefined,event.target.value);
                        //console.log(this.refs.) /
                        //console.log('in FilterOptions handlerUserInput',typeof i);
                        //get the option selected to pass in
                        //console.dir(i);
                        //console.log('230',this.refs.filterOption.getDOMNode().value);
                        //this.props.onUserInput()
                        //CURRENT: Grab the value selected
                    },
                    render: function(){
                        //TODO: CLEANUP
                        //    console.log('235');
                        //    var Options = [];
                            //for(var i = 0;i<4;i++){
                            //    Options.push(<option
                            //                    key={i}
                            //                    ref="filterOption"
                            //                    >
                            //                    Option # {i}
                            //                </option>)
                            //};
                            //Options = AppartmentCostRange.map(function(item, index){
                            //    return(
                            //
                            //    );
                            //},this);
                            //Options = AppartmentCostRange.map(function(item, i) {
                            //    console.log(item);
                            //    return (
                            //        <div
                            //            onChange={this.handleUserInput.bind(this, i)} key={i}
                            //            ref="filterOption">
                            //            {item}
                            //        </div>
                            //    );
                            //}, this)
                        http://stackoverflow.com/questions/21733847/react-jsx-selecting-selected-on-selected-select-option
                        //http://stackoverflow.com/questions/28868071/onchange-event-using-react-js-for-drop-down
                        return (
                            React.createElement("div", null, 
                                React.createElement("select", {onChange: this.handleUserInput, value: this.state.value}, 
                                AppartmentCostRange.map(function(item) {
                                    return (
                                        React.createElement("option", {value: item}, " Less than ", item
                                        )
                                    );
                                }, this)
                                )
                            )
                        );
                    }
                });

    var SelectedView = React.createClass({displayName: "SelectedView",
        render: function(){
            return (
                React.createElement("div", {className: "SelectedView"}, 
                    React.createElement(FilteredResults, {
                        filterText: this.props.filterText, 
                        selectedOptions: this.props.selectedOptions}
                    )
                )
                )
        }
    });
        var FilteredResults = React.createClass({displayName: "FilteredResults",
            loadAllCitiesFromServer: function(){
                ajaxServerRequest().then(fulfilled);
                var self = this;
                function fulfilled(response){
                    // cityData = response.cityData;
                    // filters = response.filters;
                     console.log('168',response); //Test Search: Chiang Mai
                    self.setState({citydata:response});
                }
            },
            getInitialState: function(){
                return {citydata:[]};
            },
            componentDidMount: function(){
                this.loadAllCitiesFromServer();
            },
            render: function(){
                //console.log('render',this.props.filterText);
                var self = this;

                //NOTE: This is only a direct lookup of the file name
                //TODO: You need to improve the searching for more data points
                //like doing a debounce type search instead

                //TODO: You need a scraper for all the filter ranges data
                //into another .json file
                //TODO: You need an option to add more filters to show, so
                //only show a subset list to begin with
                //TODO: Search only works for one item, at a time, so either cost or search Needs to be more robust
                var searchResult = this.state.citydata.filter(function(city){
                    console.log(city['data-apartment-cost'] < 500, self.props.selectedOptions);
                    return (
                            city['data-name'] === self.props.filterText ||
                            parseInt(city['data-apartment-cost']) < self.props.selectedOptions
                            );
                });

                console.log(searchResult);



                //console.log(filter);

                var FilteredResults = searchResult.map(function(city){
                    return (React.createElement("li", null, city['data-name']))
                });
                return (
                    React.createElement("div", {className: "FilteredResult"}, 
                        FilteredResults
                    )
                    )
            }
        });
            //TODO:Image|Data Points|Place Name
            var DataCorners;
            var DisplayImage;

var App = React.createClass({displayName: "App",
	render: function(){
		// console.log(filters);
		//<NavBar/> TODO: Temp removed
		return (
				React.createElement("div", {className: "App"}, 
					React.createElement(FilterableView, null)
				)
			)
	}
});

React.render(React.createElement(App, null),document.getElementById('content'));