var React = require("react");
const LAYOUT = require('./../layout.jsx');

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
      <LAYOUT>
        <main role="main">
          <section class="jumbotron text-center">
            <div class="container">
              <h1 class="jumbotron-heading">Community For Catlovers</h1>
              <p class="lead text-muted">Support and follow our community cats and their carers.<br/>Be a carer yourself and contribute to the welfare of our community cats.</p>
              <p>
                <a href={display.formAction1} class="btn btn-primary my-2">{display.button1}</a>&nbsp;&nbsp;&nbsp;
                <a href={display.formAction2} class="btn btn-secondary my-2">{display.button2}</a>
              </p>
            </div>
          </section>
          <form method="GET" action="/user">
            <input type="submit" value="View Users"/>
          </form>
          <ul>
            {cats}
          </ul>
        </main>
      </LAYOUT>
    );
  }
}

module.exports = Home;