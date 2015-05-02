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
			filterText: ''			//straight text debounce search
			//TODO: Include more search options from cityData.json
			selectedOptions: []; 	//{filter:optionSelected}
		}
	},
	handleUserInput: function(filterText){
		console.log('filterText',filterText);
		this.setState({
			filterText: filterText
		});
	},
	render: function(){
		//<h1>Hello World</h1>
		return (
			<div>
				<FilterMenu
					filterText={this.state.filterText}
					onUserInput={this.handleUserInput}
				/>
				<SelectedView
					filterText={this.state.filterText}
				/>
			</div>
		)
	}
});

var FilterMenu = React.createClass({
	handleUserInput: function(filterText){
		this.props.onUserInput(filterText);
	},
	render: function(){
		return (
			<div className="FilterMenu">
				<FilterViews/>
				<FilterItems
					filterText={this.props.filterText}
					onUserInput={this.handleUserInput}
				/>
			</div>
			)
	}
});
	var FilterViews = React.createClass({
		render: function(){
			return (
				<div className="FilterViews">
					<h3>Filter Views</h3>
					<ul>
						<li>Grid View</li>
						<li>List View</li>
						<li>Map View</li>
						<li>Settings View</li>
					</ul>
				</div>
				)
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
		getInitialState: function(){
			return {filters:[]};
		},
		componentDidMount: function(){
			this.loadFiltersFromServer();
		},
		handleChange: function(){
			console.log('here',this.props);
			this.props.onUserInput(
				this.refs.filterTextInput.getDOMNode().value
			);
		},
		render: function(){
			//console.log('FilterItems.this.props',this.props);

			var Cost = AppartmentCostRange.map(function(cost){
				return(<option value={cost}>{cost}</option>)
			});

			var FilterItems = this.state.filters.map(function(filter){
				return (
					<div>
						<select>
							<option value selected> {filter.slice(5,filter.length)}</option>
							{Cost}
						</select>
					</div>
					)
			});

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
						<ul>
							{FilterItems}
						</ul>

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
				 console.log('168',response);
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
		return (
				<div className="App">
					<NavBar/>
					<FilterableView/>
				</div>
			)
	}
});

React.render(<App/>,document.getElementById('content'));