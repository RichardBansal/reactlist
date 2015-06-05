var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    LeftNav = mui.LeftNav,
    DropDownMenu = mui.DropDownMenu,
    Paper = mui.Paper,
    FilteredResults = require('./filteredresults.js');

module.exports = React.createClass({
    render(){
        return (
            <div className="SelectedView">
                <FilteredResults
                    filterText={this.props.filterText}
                    selectedOptions={this.props.selectedOptions}
                    />
            </div>
        );
    }
});

//TODO:Image|Data Points|Place Name
var DataCorners;
var DisplayImage;