var React = require("react");

class Profile extends React.Component {
  render() {
    let display = this.props.account;
    console.log(display);
    return (
      <html>
        <head />
        <body>
          <h3>{display.name}</h3>
                Joined on {display.to_char}<br/>
        </body>
      </html>
    );
  }
}

module.exports = Profile;