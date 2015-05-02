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
		this.setState({
			filterText: filterText
		});
	},
	render: function(){
		//<h1>Hello World</h1>
		return (
			React.createElement("div", null, 
				React.createElement(FilterMenu, null), 
				React.createElement(SelectedView, null)
			)
		)
	}
});

var FilterMenu = React.createClass({displayName: "FilterMenu",
	render: function(){
		//console.log('this.props',this.props);
		return (
			React.createElement("div", {className: "FilterMenu"}, 
				React.createElement(FilterViews, null), 
				React.createElement(FilterItems, null)
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
				// cityData = response.cityData;
				// filters = response.filters;
				// console.log('response.filters',Object.keys(response[0]));
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
		render: function(){
			var FilterItems = this.state.filters.map(function(filter){
			return (React.createElement("li", null, filter.slice(5,filter.length))
				)
			});
			return (
				React.createElement("div", {className: "FilterItems"}, 
					React.createElement("h3", null, "Filter Items"), 
						"Quick Search", 
						React.createElement("input", {type: "text", name: "search"}), 
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
				React.createElement(FilteredResults, null)
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
				// console.log('response.filters',Object.keys(response[0]));
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
			var FilteredResults = this.state.citydata.map(function(city){
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