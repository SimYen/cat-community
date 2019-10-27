var React = require("react");
const LAYOUT = require('./../layout.jsx');

class Profile extends React.Component {
  render() {
    let display = this.props;
    return (
      <LAYOUT>
        <main role="main">
          <h3>{display.account.name}</h3>
                Joined on {display.account.to_char}<br/>
            <form method={display.method} action={display.formAction}>
                <input type="submit" value={display.button}/>
            </form>
        </main>
      </LAYOUT>
    );
  }
}

module.exports = Profile;