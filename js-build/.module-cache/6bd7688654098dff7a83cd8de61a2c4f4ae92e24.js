console.log('hello world');



var NavBar = React.createClass({displayName: "NavBar",
	render: function(){
		return (
			React.createElement("h1", null, "Hello World")
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

React.render(
	React.createElement(NavBar, null),
	document.getElementById('content')
);