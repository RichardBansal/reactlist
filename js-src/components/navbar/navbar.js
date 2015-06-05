var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    LeftNav = mui.LeftNav,
    DropDownMenu = mui.DropDownMenu,
    Paper = mui.Paper;

module.exports = React.createClass({
    render() {
        var NavBar = Links.map((link)=>{
            return (<li>{link}</li>
            );
        });
        return (
            <div className="NavBar">
                <h1>Navigation</h1>
                <ul>
                    {NavBar}
                </ul>
            </div>
        );
    }
});