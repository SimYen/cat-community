var React = require("react");
const LAYOUT = require('./../layout.jsx');

class Home extends React.Component {
  render() {
    const display = this.props;
    return (
      <LAYOUT>
        <main role="main">
          <section class="jumbotron text-center">
            <div class="container">
              <img class="mb-4" src="/image/strayCatFeederLogo.png" alt="" width="200" height="200"/>
              <h1 class="jumbotron-heading">Community For Catlovers</h1>
              <p class="lead text-muted">Support and follow our community cats and their carers.<br/>Be a carer yourself and contribute to the welfare of our community cats.</p>
              <p>
                <a href={display.formAction1} class="btn btn-primary my-2">{display.button1}</a>&nbsp;
                <a href={display.formAction2} class="btn btn-secondary my-2">{display.button2}</a>
              </p>
            </div>
          </section>
          <br/>
          <div class="container">
            <div class="btn-group" role="group" aria-label="Cat Info">
              <button class="btn btn-warning" id="cats" type="button">Cats</button>
              <button class="btn btn-info" id="users" type="button">Users</button>
            </div>
            <hr/>
            <div class="row" id="info"></div>
          </div>
        </main>
        <script src="/script/index.js"/>
      </LAYOUT>
    );
  }
}

module.exports = Home;