var React = require("react");

class Profile extends React.Component {
  render() {
    let display = this.props;
    return (
      <html>
        <head />
        <body>
          <h3>{display.account.name}</h3>
                Joined on {display.account.to_char}<br/>
            <form method={display.method} action={display.formAction}>
                <input type="submit" value={display.button}/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Profile;