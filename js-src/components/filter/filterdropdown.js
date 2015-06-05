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
    getInitialState(){
        return{
            selectedOptions:[]
        };
    },
    handleUserInput(undefined,selectedOption){
        //console.log('205.FilterDropDown.handleUserInput',selectedOption);
        CityActions.dropDownUpdated(selectedOption.filter,selectedOption.value);
    },
    componentDidMount(){
        var self = this;
        CityStore.on('change', ()=>{
            self.setState({selectedOptions:CityStore.getSelectedOptions()});
        });
    },
    render(){
        //TODO: For each filter you need to send the appropriate data down
        var FilterArr = (CityStore.getDataFilters()).map((filter)=>{
            return (
                <div>
                    {filter.filterName}
                    <FilterOptions
                        selectedOptions={this.state.selectedOptions}
                        onUserInput={this.handleUserInput}
                        filterName={filter.filterName}
                        filterData={filter.filterData}
                        />
                </div>
            );
        });

        return (<div>
            {FilterArr}
        </div>);
    }
});

var FilterOptions = React.createClass({
    getInitialState() {
        return {
            value: undefined
        };
    },
    handleUserInput(event,selectedIndex,menuItem){
        //console.log('308.handleUserInput arguments',arguments);
        //console.log('273.FilterOptions.handleUserInput',event.target.value, this.props.filterName);
        this.setState({value:parseInt(menuItem.value)});
        this.props
            .onUserInput
            (
                undefined,
                {
                    value:parseInt(menuItem.value),
                    filter:this.props.filterName
                }
            );
    },
    render(){
            var menuItems = [];
            menuItems = this.props.filterData.map((item) => {
                return (
                    {payload:item,text:"Less than "+item, value:item}
                );
        }, this);

        return (
            <div>
                <DropDownMenu
                    menuItems={menuItems}
                    onChange={this.handleUserInput}
                    value={this.state.value}>
                </DropDownMenu>
            </div>
        );
    }
});