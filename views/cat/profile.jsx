var React = require("react");

class Profile extends React.Component {
  render() {
    let display = this.props;
    return (
      <html>
        <head />
        <body>
          <h3>{display.cat.name}</h3>
            <form method="GET" action={display.formAction}>
                Description: {display.cat.description}<br/>
                Location: {display.cat.location}<br/>
                <input type="submit" value="Update"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Profile;