console.log('hello world');

React.render(
	React.createElement("h1", null, "Hello World"),
	React.createElement(NavBar, null),
	document.getElementById('content')
);

var NavBar = React.createClass({displayName: "NavBar",
	render: function(){
		return (
			React.createElement("h1", null, "Navigation Bar")
			)
	}
});

var FilterMenu;
	var FilterViews;
	var FilterItems;

var SelectedView;
	var FileredResults; //Image|Data Points|Place Name
		var DataCorners;
		var DisplayImage;
