var React = require("react");

class Profile extends React.Component {
  render() {
    let display = this.props;
    return (
      <html>
        <head />
        <body>
          <h3>{display.cat.name}</h3>
          <form method={display.method} action={display.formAction}>
            <input type="submit" value={display.button}/>
          </form>
          <form method="POST" action={"/fed/" + display.cat.id + "?_method=put"}>
            <input type="submit" value={"Feed " + display.cat.name}/>
          </form>
          <form method="GET" action={"/cat/" + display.cat.id + "/edit"}>
            Description: {display.cat.description}<br/>
            Location: {display.cat.location}<br/>
            Added by: <a href={"/user/" + display.cat.user_id}>{display.user_name}</a> on {display.cat.to_char}<br/>
            <input type="submit" value="Update"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Profile;