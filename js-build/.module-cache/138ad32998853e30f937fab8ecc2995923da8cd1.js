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
			filterText: ''
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
			React.createElement("div", null, 
				React.createElement(FilterMenu, {
					filterText: this.state.filterText, 
					onUserInput: this.handleUserInput}
				), 
				React.createElement(SelectedView, {
					filterText: this.state.filterText}
				)
			)
		)
	}
});

var FilterMenu = React.createClass({displayName: "FilterMenu",
	handleUserInput: function(filterText){
		this.props.onUserInput(filterText);
	},
	render: function(){
		return (
			React.createElement("div", {className: "FilterMenu"}, 
				React.createElement(FilterViews, null), 
				React.createElement(FilterItems, {
					filterText: this.props.filterText, 
					onUserInput: this.handleUserInput}
				)
			)
			)
	}
});
	var FilterViews = React.createClass({displayName: "FilterViews",
		render: function(){
			return (
				React.createElement("div", {className: "FilterViews"}, 
					React.createElement("h3", null, "Filter Views"), 
					React.createElement("ul", null, 
						React.createElement("li", null, "Grid View"), 
						React.createElement("li", null, "List View"), 
						React.createElement("li", null, "Map View"), 
						React.createElement("li", null, "Settings View")
					)
				)
				)
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
			var FilterItems = this.state.filters.map(function(filter){
			return (
				//<li>
				React.createElement("select", null, 
					filter.slice(5,filter.length)
				)
				//</li>
				)
			});
			return (
				React.createElement("div", {className: "FilterItems"}, 
					React.createElement("h3", null, "Filter Items"), 
						"Quick Search", 
						React.createElement("input", {
							type: "text", 
							placeholder: "search..", 
							value: this.props.filterText, 
							ref: "filterTextInput", 
							onChange: this.handleChange}
						), 
						React.createElement("ul", null, 
							FilterItems
						)

				)
				)
		}
	});

var SelectedView = React.createClass({displayName: "SelectedView",
	render: function(){
		return (
			React.createElement("div", {className: "SelectedView"}, 
				React.createElement(FilteredResults, {filterText: this.props.filterText}
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
		return (
				React.createElement("div", {className: "App"}, 
					React.createElement(NavBar, null), 
					React.createElement(FilterableView, null)
				)
			)
	}
});

React.render(React.createElement(App, null),document.getElementById('content'));