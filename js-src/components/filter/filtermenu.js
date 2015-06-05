var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    LeftNav = mui.LeftNav,
    DropDownMenu = mui.DropDownMenu,
    Paper = mui.Paper,
    FilterItems = require('./filteritems');

var FilterViews = React.createClass({
    render(){
        //TODO: Temp removed below
        //<h3>Filter Views</h3>
        //<ul>
        //<li>Grid View</li>
        //<li>List View</li>
        //<li>Map View</li>
        //<li>Settings View</li>
        //</ul>//
        return (<div className="FilterViews"></div>);
    }
});

module.exports = React.createClass({
    handleUserInput(filterText, selectedOption){
        console.log('166.handleUserInput',filterText,selectedOption);
        this.props.onUserInput(filterText, selectedOption);
    },
    render(){
        return (
            //TODO: <FilterViews/>
            <div className="FilterMenu">

                <FilterItems
                    filterText={this.props.filterText}
                    selectedOptions={this.props.selectedOptions}
                    onUserInput={this.handleUserInput}
                    />
            </div>
        );
    }
});