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
			selectedOptions: []
            //TODO: Should selectedOptions be an object, for easy replace?
		}
	},
	handleUserInput: function(filterText, selectedOption){
		//console.log('58 - handleUserInput',filterText, selectedOption);

		//this.state.selectedOptions
		//	= (selectedOption ?
		//		this.state.selectedOptions.push(selectedOption):
		//		this.state.selectedOptions);
        //TODO: You need to manage options changed for the same filter

        var updatedSelectedOptions = this.state.selectedOptions;
        updatedSelectedOptions.push(selectedOption);
        //if(selectedOptions.length==0){
        //    selectedOptions.push(selectedOption);
        //}

        //if(!selectedOption)
        this.setState({
            filterText: filterText,
            selectedOptions: updatedSelectedOptions
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
		handleChange: function(){
			console.log('!!!145 - filter name', this.refs.filterName.getDOMNode().innerText);

			this.props.onUserInput(
				this.refs.filterTextInput.getDOMNode().value,
				this.refs.filterOptionsInput.getDOMNode().value
			);
		},
		render: function(){
			//console.log('FilterItems.this.props',this.props);
			//var Cost = [].push(<option>{filter.slice(5,filter.length)}</option>);
			var Cost = AppartmentCostRange.map(function(cost){
				return( <option value={cost} ref="filterOptionsInput">
                            {cost}
                        </option>)
			});
			//{filter.slice(5,filter.length)}
            //CHECK: onChange correct, onSelect
			//TODO: The actual filter value is not showing up, correct this
            //TODO: FIX: Not working correctly, only last option is always being selected

            var self = this; //required to reference this in FilterItems
			var FilterItems = this.state.filters.map(function(filter){
				return (
					<div onChange={self.handleChange}>
                        <span ref="filterName">{filter}</span>
						<select>

                            {Cost}
						</select>
					</div>
					)
			});
			//<div>
			//	{FilterItems}
			//</div>
			//<button onClick={this.handleChange}>Test</button>
			//<select onChange={this.handleChange} ref="filterOptionsInput">
			//</select>
			//TODO: Use a slider to for a more granular change
			return (
				<div className="FilterItems">
					<h3>Filter Items</h3>
						Quick Search
						<input
							type="text"
							placeholder="search.."
							value={this.props.filterText}
							ref="filterTextInput"
							onChange={this.handleChange}
						/>
                        {FilterItems}
				</div>
				)
		}
	});

var SelectedView = React.createClass({
	render: function(){
		return (
			<div className="SelectedView">
				<FilteredResults filterText={this.props.filterText}
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
			var searchResult = this.state.citydata.filter(function(city){
				return city['data-name'] === self.props.filterText;
			});

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