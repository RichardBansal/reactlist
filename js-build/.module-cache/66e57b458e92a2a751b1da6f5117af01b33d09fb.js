console.log('hello world');


var Data = [
]
var NavBar = React.createClass({displayName: "NavBar",
	render: function(){
		return (
			React.createElement("div", {className: "NavBar"}, 
				React.createElement("h1", null, "Navigation"), 
				React.createElement("ul", null, 
					React.createElement("li", null, "Cities"), 
					React.createElement("li", null, "Forum"), 
					React.createElement("li", null, "Chat"), 
					React.createElement("li", null, "Guides"), 
					React.createElement("li", null, "Remote Jobs"), 
					React.createElement("li", null, "Meetups"), 
					React.createElement("li", null, "Stories"), 
					React.createElement("li", null, "Signup")
				)
			)
			) 
	}
});

var FilterMenu = React.createClass({displayName: "FilterMenu",
	render: function(){
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
	})
		
	var FilterItems = React.createClass({displayName: "FilterItems",
		render: function(){
			return (
				React.createElement("div", {className: "FilterItems"}, 
					React.createElement("h3", null, "Filter Items"), 
						React.createElement("ul", null, 
							React.createElement("li", null, "Search"), 
							React.createElement("li", null, "Cost"), 
							React.createElement("li", null, "Interview Speed"), 
							React.createElement("li", null, "Temperature"), 
							React.createElement("li", null, "Region")
						)

				)
				)
		}
	})

var SelectedView = React.createClass({displayName: "SelectedView",
	render: function(){
		return (
			React.createElement("div", {className: "SelectedView"}, 
				React.createElement(FilteredResults, null)
			)
			)
	}
})
	var FilteredResults = React.createClass({displayName: "FilteredResults",
		render: function(){
			return (
				React.createElement("div", {className: "FilteredResult"}, 
					React.createElement("h4", null, "Filtered Results"), 
					React.createElement("h5", null, "Toronto"), 
					React.createElement("h5", null, "Boston"), 
					React.createElement("h5", null, "SF"), 
					React.createElement("h5", null, "NYC")
				)
				)
		}
	}); 

		//Image|Data Points|Place Name
		var DataCorners;
		var DisplayImage;

var App = React.createClass({displayName: "App",
	render: function(){
		return (
				React.createElement("div", {className: "App"}, 
					React.createElement(NavBar, null), 
					React.createElement(FilterMenu, null), 
					React.createElement(SelectedView, null)
				)
			)
	}
});

React.render(React.createElement(App, null),document.getElementById('content'));