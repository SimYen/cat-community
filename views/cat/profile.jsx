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
                Added by: {display.user_name} on {display.cat.to_char}<br/>
                <input type="submit" value="Update"/>
            </form>
            <form method="POST" action={"/user/cat/" + display.cat.id}>
                <input type="submit" value="Follow"/>
            </form>
            <form method="POST" action={"/user/cat/" + display.cat.id + "?_method=delete"}>
              <input type="submit" value="Unfollow"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Profile;