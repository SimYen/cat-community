var React = require("react");

class Home extends React.Component {
  render() {
    const display = this.props;
    let logout = "";
    if (display.user){
      logout = <form method="GET" action="logout"><input type="submit" value="Logout"/></form>;
    };
    const users = display.result.map(user => {
        return (
          // to link to users
          <li>{user.name}&nbsp;joined on&nbsp;{user.to_char}
            <form method="GET" action={"/user/" + user.id}>
              <input type="submit" value="View"/>
            </form>
          </li>
        );
    });
    return (
      <html>
        <head />
        <body>
          <h1>FEEDR</h1>
          <h2>{display.user}</h2>
          <form method="GET" action={display.formAction1}>
            <input type="submit" value={display.button1}/>
          </form>
          {logout}
          <form method="GET" action={display.formAction2}>
            <input type="submit" value={display.button2}/>
          </form>
          <ul>
            {users}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;