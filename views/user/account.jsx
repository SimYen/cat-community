var React = require("react");

class User extends React.Component {
  render() {
    let display=this.props.account;
    if (display.user) { console.log("login user") } else { console.log("register user") };
    return (
      <html>
        <head />
        <body>
          <h3>{display.title}</h3>
          <font color="red">{display.message}</font>
            <form method="POST" action={display.formAction}>
                Name: <input type="text" name="name" required/><br/>
                Password: <input type="password" name="password" required/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = User;