var React = require("react");

class User extends React.Component {
  render() {
    let display=this.props.account;
    return (
      <html>
        <head />
        <body>
          <h3>{display.title}</h3>
          <font color="red">{display.message}</font>
            <form method="POST" action={display.formAction}>
                Username: <input type="text" name="name" defaultValue={display.user.name} required/><br/>
                Password: <input type="password" name="password" required/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = User;