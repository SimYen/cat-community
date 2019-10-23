var React = require("react");

class Home extends React.Component {
  render() {
    const display = this.props;
    const cats = display.result.map(cat => {
      return (
        // to link to cat
        <li>{cat.cat}
            &nbsp;by&nbsp;
            {cat.name}</li>
        // to link to user
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