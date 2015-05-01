console.log('hello world');

var App = React.createClass({displayName: "App",
	render: function(){
		return (
				React.createElement("div", null
					
				)
			)
	}
});

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
			React.createElement("h2", null, "Filter Menu")
			)
	}
});
	var FilterViews;
	var FilterItems;

var SelectedView;
	var FileredResults; //Image|Data Points|Place Name
		var DataCorners;
		var DisplayImage;

React.render(
	
	document.getElementById('content')
);