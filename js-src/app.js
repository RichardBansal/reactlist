//REF:https://magic.import.io/
//ASK: Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of FilterItems. See http://fb.me/react-warning-keys for more information.
console.log('App starting');
var React = require('react');
var $ = require('jquery');

var ajaxServerRequest = function(){
	var url = "http://localhost:5000/";
	console.log('request data',url);
	return $.ajax(
			{
				url:url,
				dataType: 'jsonp',
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
var DataFilters = [
    {filterName: "data-long-term-cost", filterData: ["500","1000","1500","2000","3000","5000"]},
    {filterName: "data-apartment-cost", filterData: ["125","250","500","1000","2000"]},
    {filterName: "data-hotel-price", filterData: ["3","5","10","25","50"]},
    {filterName: "data-nomadcost", filterData: ["500","1000","1500","2000","3000","5000"]}
];

var NavBar = React.createClass({
	render: function(){
		var NavBar = Links.map(function(link){
			return (<li>{link}</li>
				)
		});
		return (
			<div className="NavBar">
				<h1>Navigation</h1>
				<ul>
					{NavBar}
				</ul>
			</div>
			) 
	}
});

var FilterableView = React.createClass({
	getInitialState: function(){
		return {
			//straight text debounce search
			filterText: '',
			//TODO: Include more search options from cityData.json
			//{filter:optionSelected}
			selectedOptions: [] //TODO: Include option for added multiple Options, only one value right now
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
        //if(updatedSelectedOptions.indexOf(selectedOption))
        var wasReplaced = false;
        //TODO: Bug where when you change the search, you erase the selectedOptions
        if(selectedOptions){
            var updatedSelectedOptions = this.state.selectedOptions;
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
        if((!selectedOption)&&(filterText)){
			//this.setState({
			//	filterText: filterText,
			//});
            this.setState({
                filterText: filterText//,
                //selectedOptions: updatedSelectedOptions
            });
        } else if (!filterText&&selectedOption){
			//this.setState({
			//	selectedOptions: this.state.selectedOptions.push(selectedOption)
			//});
            this.setState({
                //filterText: filterText,
                selectedOptions: updatedSelectedOptions
            });
        } else {
			//this.setState({
			//	filterText: filterText,
			//	selectedOptions: this.state.selectedOptions.push(selectedOption)
			//});
            this.setState({
                filterText: filterText,
                selectedOptions: updatedSelectedOptions
            });
        }

        console.log('123.handleUserInput.setState',this.state);
	},
	render: function(){
        //console.log('95-FilterableView Render',this.state);
		//<h1>Hello World</h1>
		//console.log('82 - rendering FilterableView',this.state);
		return (
			<div>
				<FilterMenu
					filterText={this.state.filterText}
					selectedOptions={this.state.selectedOptions}
					onUserInput={this.handleUserInput}
				/>
				<SelectedView
					filterText={this.state.filterText}
					selectedOptions={this.state.selectedOptions}
				/>
			</div>
		)
	}
});

    var FilterMenu = React.createClass({
        handleUserInput: function(filterText, selectedOption){
            this.props.onUserInput(filterText, selectedOption);
        },
        render: function(){
            return (
                <div className="FilterMenu">
                    <FilterViews/>
                    <FilterItems
                        filterText={this.props.filterText}
                        selectedOptions={this.props.selectedOptions}
                        onUserInput={this.handleUserInput}
                    />
                </div>
                )
        }
    });
        var FilterViews = React.createClass({
            render: function(){
                //TODO: Temp removed below
                //<h3>Filter Views</h3>
                //<ul>
                //<li>Grid View</li>
                //<li>List View</li>
                //<li>Map View</li>
                //<li>Settings View</li>
                //</ul>
                return (<div className="FilterViews"></div>)
            }
        });
        var FilterItems = React.createClass({
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
                    )
            }
        });
            var FilterInput = React.createClass({
                handleUserInput: function(){
                    this.props.onUserInput(
                        this.refs.filterTextInput.getDOMNode().value,
                        undefined
                    )
                },
                render: function(){
                    return (
                                <input
                                type="text"
                                placeholder="Search..."
                                value={this.props.filterText}
                                ref="filterTextInput"
                                onChange={this.handleUserInput}
                                />
                            )
                }
            });
            var FilterDropDown = React.createClass({
                //getInitialState: function(){
                //    //TODO: YOU WERE WORKING HERE
                //},
                handleUserInput: function(undefined,selectedOption){
                    console.log('205.FilterDropDown.handleUserInput',selectedOption);
                    //are you getting the filter and the filter option
                    //wrap the option and the correct filter
                    //console.log('205',this.refs.filterDropDown.getDOMNode().value);
                    this.props.onUserInput(
                        undefined,
                        selectedOption
                    )
                },
                render:function(){
                    //var Selects = [];
                    //
                    //for(var i = 0;i<1;i++){
                    //    Selects.push(
                    //        {i},
                    //        <select
                    //            value="Select"
                    //            ref="filterDropDown"
                    //            key={i}>
                    //            <FilterOptions
                    //                onChange={this.handleUserInput}
                    //                onUserInput={this.handleUserInput}
                    //                selectedOptions={this.props.selectedOptions}/>
                    //        </select>)
                    //};
                    //TODO: For each filter you need to send the appropriate data down
                    //var FilterName = DataFilters.map(function(filter){
                    //    return filter.filterName;
                    //});

                    var FilterArr = DataFilters.map(function(filter){
                        return (
                                <div>
                                    {filter.filterName}
                                    <FilterOptions
                                    selectedOptions={this.props.selectedOptions}
                                    onUserInput={this.handleUserInput}
                                    filterName={filter.filterName}
                                    filterData={filter.filterData}
                                    />
                                </div>
                            )
                    }.bind(this));

                    return (<div>
                                {FilterArr}
                            </div>)
                }
            });
                var FilterOptions = React.createClass({
                    getInitialState: function(){
                        return {
                            value: undefined

                        }
                    },
                    //change: function(event){
                    //    console.log(event.target.value);
                    //    this.setState({value:event.target.value});
                    //
                    //},
                    handleUserInput: function(event){
                        console.log('273.FilterOptions.handleUserInput',event.target.value, this.props.filterName);
                        this.setState({value:event.target.value});
                        this.props
                            .onUserInput
                                    (
                                        undefined,
                                        {
                                            value:event.target.value,
                                            filter:this.props.filterName
                                        }
                                    )
                        //event.target.value);
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
                            <div>
                                <select onChange={this.handleUserInput} value={this.state.value}>
                                {this.props.filterData.map(function(item) {
                                    return (
                                        <option value={item}> Less than {item}
                                        </option>
                                    );
                                }, this)}
                                </select>
                            </div>
                        );
                    }
                });

    var SelectedView = React.createClass({
        render: function(){
            return (
                <div className="SelectedView">
                    <FilteredResults
                        filterText={this.props.filterText}
                        selectedOptions={this.props.selectedOptions}
                    />
                </div>
                )
        }
    });
        var FilteredResults = React.createClass({
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
                var searchResult = [];
                var searchResult = this.state.citydata.filter(function(city){
                    //console.log('381',city);
                    //TODO: Clean-up, initial state does not have filter properties set.
                    //if()
                    //TODO: Only allowed search or filter, not both yet
                    if((self.props.selectedOptions)&&(self.props.filterText)){
                        var filter = self.props.selectedOptions[filter];
                        var tempArr = Array.prototype.slice.call(self.props.selectedOptions);
                        var result = tempArr.every(function(filterObj){
                            return (parseInt(city[filterObj.filter]) < filterObj.value);
                        });
                        result=result && city['data-name'].indexOf(self.props.filterText) !== -1;
                        return (
                            result
                        )
                    } else if(self.props.selectedOptions){
                        var filter = self.props.selectedOptions[filter];
                        //console.log('386',filter);
                        //console.log(
                        //    '386.render.FilteredResutls',
                        //    //    //city['data-apartment-cost'] < 500,
                        //    //    //self.props.selectedOptions
                        //    city[filter],
                        //    self.props.selectedOptions.value
                        //);
                        //{value:"500",filter:"nomadCost"}
                        var tempArr = Array.prototype.slice.call(self.props.selectedOptions);
                        var result = tempArr.every(function(filterObj){
                            return (parseInt(city[filterObj.filter]) < filterObj.value);
                        });
                        //console.log(result);
                        //TODO: Assumed this is working, to test!
                        //TODO: Set initial values for options, its empty, not i.e. 'LESS than 500' on load
                        return (
                        //parseInt(city[self.props.selectedOptions.filter]) < self.props.selectedOptions.value
                            result
                        )
                    } else {
                        return (
                            city['data-name'].indexOf(self.props.filterText) !== -1
                        )
                    }
                    //return (
                    //        city['data-name'] === self.props.filterText ||
                    //        parseInt(city[self.props.selectedOptions.filter]) < self.props.selectedOptions.value
                    //        );
                });

                //console.log('397.searchResult',searchResult);



                //console.log(filter);

                var FilteredResults = searchResult.map(function(city){
                    return (<li>{city['data-name']}</li>)
                });
                return (
                    <div className="FilteredResult">
                        {FilteredResults}
                    </div>
                    )
            }
        });
            //TODO:Image|Data Points|Place Name
            var DataCorners;
            var DisplayImage;

var App = React.createClass({
	render: function(){
		// console.log(filters);
		//<NavBar/> TODO: Temp removed
		return (
				<div className="App">
					<FilterableView/>
				</div>
			)
	}
});

React.render(<App/>,document.getElementById('content'));

//NEXT: Actually using multiple filters