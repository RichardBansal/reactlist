var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    LeftNav = mui.LeftNav,
    DropDownMenu = mui.DropDownMenu,
    Paper = mui.Paper,
    CityStore = require('../../stores'),
    CityActions =  require('./../../actions'),
    _ = require('lodash');

module.exports = React.createClass({
    getInitialState() {
        return {citydata:[]};
    },
    componentDidMount(){
        var self = this;
        //self.loadAllCitiesFromServer();
        CityActions.retrieveCityData();
        CityStore.on('change',()=>{
            self.setState({citydata:CityStore.getFilteredCityData()||CityStore.getCityData()});
        });
    },
    render(){
        var FilteredResults = _.map(this.state.citydata,(city)=>{
            var imageSource = 'images/' + city['data-slug'] + '.jpg';
            return (
                <div className="city">
                    <div>
                        <Paper zDepth={2}>
                            <p className="CityName">{city['data-name']}</p>
                            <img src={imageSource}/>
                        </Paper>
                    </div>
                </div>
            );
        });
        return (
            <div className="FilteredResult">
                {FilteredResults}
            </div>
        );
    }
});