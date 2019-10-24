var React = require("react");

class Home extends React.Component {
  render() {
    const display = this.props;
    let logout = "";
    if (display.user){
      logout = <form method="GET" action="logout"><input type="submit" value="Logout"/></form>;
    };
    const cats = display.result.map(cat => {
        return (
          // to link to cat
          <li>{cat.name}&nbsp;registered by&nbsp;
            <a href={"/user/" + cat.user_id}>{cat.reg_by}</a>
            <form method="GET" action={"/cat/" + cat.id}>
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
            {cats}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;