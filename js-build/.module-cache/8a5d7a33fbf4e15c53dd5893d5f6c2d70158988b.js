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
		
	})

var SelectedView;
	var FileredResults; //Image|Data Points|Place Name
		var DataCorners;
		var DisplayImage;

var App = React.createClass({displayName: "App",
	render: function(){
		return (
				React.createElement("div", null, 
					React.createElement(NavBar, null), 
					React.createElement(FilterMenu, null)
				)
			)
	}
});

React.render(React.createElement(App, null),document.getElementById('content'));