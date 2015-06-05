//REF:https://magic.import.io/
//ASK: Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of FilterItems. See http://fb.me/react-warning-keys for more information.
console.log('App starting');
var React = require('react'),
    $ = require('jquery'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    Paper = mui.Paper,
    LeftNav = mui.LeftNav,
    DropDownMenu = mui.DropDownMenu,
    {Container,Block} = require('react-flexgrid'),
    SelectedView = require('./components/view/selectedview.js'),
    FilterMenu = require('./components/filter/filtermenu.js');

var FilterableView = React.createClass({
    render(){
        return (
            <div className="grid module">
                <div className="col-2-3">
                    <div className="module">
                        <SelectedView/>
                    </div>
                </div>
                <div className="col-1-3">
                    <div className="module">
                        <FilterMenu/>
                    </div>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
	render(){
		// console.log(filters);
		//<NavBar/> TODO: Temp removed
		return (
				<div>
					<FilterableView/>
				</div>
			);
	}
});

React.render(<App/>,document.getElementById('content'));

