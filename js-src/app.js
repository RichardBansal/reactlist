//https://magic.import.io/

console.log('hello world');


// 'Search','Cost','Internet Speed','Temperature','Humidity','Air Quality','Activities',
// 'Region','Safety', 'Other'


var CityData = [
	{	Name:"Toronto",
		Cost:Math.floor((Math.random() * 2000) + 1000),
		Internet:Math.floor((Math.random() * 1000) + 50),
		Temperature:Math.floor((Math.random() * 100) + 10)
	},
	{	Name:"Boston",
		Cost:Math.floor((Math.random() * 2000) + 1000),
		Internet:Math.floor((Math.random() * 1000) + 50),
		Temperature:Math.floor((Math.random() * 100) + 10)
	},
	{	Name:"New York City",
		Cost:Math.floor((Math.random() * 2000) + 1000),
		Internet:Math.floor((Math.random() * 1000) + 50),
		Temperature:Math.floor((Math.random() * 100) + 10)
	},
	{	Name:"San Francisco",
		Cost:Math.floor((Math.random() * 2000) + 1000),
		Internet:Math.floor((Math.random() * 1000) + 50),
		Temperature:Math.floor((Math.random() * 100) + 10)
	},
] 

// {Name:,Cost:,Internet:,Temperature:,Humidity:,AirQuality:,Activities:,Region:, Safety:,Other: }

//TODO: Generate filter based on the data you have available to you
var Filter = ['Search','Cost','Internet Speed','Temperature','Humidity','Air Quality','Activities',
'Region','Safety', 'Other'];

var Links = ["Cities", "Forum", "Chat", "Guides", "Remote Jobs", "Meetups", "Stories", "Signup"];

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

var FilterMenu = React.createClass({
	render: function(){
		return (
			<div className="FilterMenu">
				<FilterViews/>
				<FilterItems/>
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
	})
		
	var FilterItems = React.createClass({
		render: function(){
			var FilterItems = Filter.map(function(filter){
			return (<li>{filter}</li>
				)
			});
			return (
				<div className="FilterItems">
					<h3>Filter Items</h3>
						<ul>
							{FilterItems}
						</ul>

				</div>
				)
		}
	})

var SelectedView = React.createClass({
	render: function(){
		return (
			<div className="SelectedView">
				<FilteredResults/>
			</div>
			)
	}
})
	var FilteredResults = React.createClass({
		render: function(){
			var FilteredResults = CityData.map(function(city){
				return (<li>{city.Name} | ${city.Cost}</li>)
			});
			return (
				<div className="FilteredResult">
					{FilteredResults}
				</div>
				)
		}
	}); 

		//Image|Data Points|Place Name
		var DataCorners;
		var DisplayImage;

var App = React.createClass({
	render: function(){
		return (
				<div className="App">
					<NavBar/>
					<FilterMenu/>
					<SelectedView/>
				</div>
			)
	}
});

React.render(<App/>,document.getElementById('content'));