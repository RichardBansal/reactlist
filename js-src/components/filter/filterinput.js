var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    LeftNav = mui.LeftNav,
    DropDownMenu = mui.DropDownMenu,
    Paper = mui.Paper,
    CityStore = require('../../stores'),
    CityActions =  require('./../../actions');

module.exports = React.createClass({
    handleUserInput(event) {
        CityActions.searchFieldUpdated(event.target.value);
    },
    getInitialState(){
        return{
            filterText:''
        };
    },
    componentDidMount(){
        var self = this;
        CityStore.on('change',()=> {
            self.setState({filterText:CityStore.getFilterText()});
        });
    },
    render() {
        return (
            <TextField
                className="clearfix"
                hintText="Search The World!!"
                value={this.state.filterText}
                ref="filterTextInput"
                onChange={this.handleUserInput}
                />
        );
    }
});