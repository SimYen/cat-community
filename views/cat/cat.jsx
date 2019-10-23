var React = require("react");

class Cat extends React.Component {
  render() {
    let display=this.props;
    if (display.cat) { console.log("updating cat info") } else { console.log("adding new cat") };
    return (
      <html>
        <head />
        <body>
          <h3>{display.title}</h3>
            <form method="POST" action={display.formAction}>
                Name: <input type="text" name="name" defaultValue={display.cat.name} required/><br/>
                Description: <input type="text" name="description" defaultValue={display.cat.description} required/><br/>
                Location: <input type="text" name="location" defaultValue={display.cat.location} required/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Cat;