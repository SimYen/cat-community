var React = require("react");
const LAYOUT = require('./../layout.jsx');

class Profile extends React.Component {
  render() {
    let display = this.props;
    return (
      <LAYOUT>
        <main role="main">
          <section class="jumbotron text-center">
            <div class="container">
              <img class="mb-4" src="/image/strayCatFeederLogo.png" alt="" width="200" height="200"/>
              <h1 class="jumbotron-heading">{display.account.name}</h1>
              <p>Joined on {display.account.to_char}</p>
              <form class="form-signin" method={display.method} action={display.formAction}>
                <button class="btn btn-lg btn-primary btn-block" type="submit">{display.button}</button>
              </form>
            </div>
          </section>
        </main>
      </LAYOUT>
    );
  }
}

module.exports = Profile;