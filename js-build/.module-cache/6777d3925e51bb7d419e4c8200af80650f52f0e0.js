console.log('hello world');

var NavBar = React.createClass({displayName: "NavBar",
	render: function(){
		return (
			React.createElement("h1", null, "Navigation Bar")
			)
	}
});

var FilterMenu = React.createClass({displayName: "FilterMenu",
	render: function(){
		return (
			React.createElement("div", null, 
				React.createElement(FilterViews, null), 
				React.createElement(FilterItems, null)
			)
			)
	}
});
	var FilterViews = React.createClass({displayName: "FilterViews",
		render: function(){
			return (
				React.createElement("h3", null, "Filter Views")
				)
		}
	})
		
	var FilterItems = React.createClass({displayName: "FilterItems",
		render: function(){
			return (
				React.createElement("div", null, 
					React.createElement("h3", null, "Filter Items")
				)
				)
		}
	})

var SelectedView = React.createClass({displayName: "SelectedView",
	render: function(){
		return (
			React.createElement("div", null, 
				React.createElement(FilteredResults, null)
			)
			)
	}
})
	var FilteredResults = React.createClass({displayName: "FilteredResults",
		render: function(){
			return (
				React.createElement("div", null, 
					React.createElement("h4", null, "Filtered Results")
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
				React.createElement("div", {className: "app"}, 
					React.createElement(NavBar, null), 
					React.createElement(FilterMenu, null), 
					React.createElement(SelectedView, null)
				)
			)
	}
});

React.render(React.createElement(App, null),document.getElementById('content'));