var React = require("react");

class Profile extends React.Component {
  render() {
    let display = this.props;
    return (
      <html>
        <head />
        <body>
          <h3>{display.user.name}</h3>
            <form method="GET" action={display.formAction}>
                Joined on {display.user.to_char}<br/>
                <input type="submit" value="Update"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Profile;