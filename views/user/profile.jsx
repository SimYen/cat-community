var React = require("react");
const LAYOUT = require('./../layout.jsx');

class Profile extends React.Component {
  render() {
    let display = this.props;
    return (
      <LAYOUT>
        <main role="main">
          <section class="jumbotron text-center">
            <div class="row">

              <div class="col-sm">
                <img class="mb-4" src="/image/strayCatFeederLogo.png" alt="" width="200" height="200"/>
                <h1 class="jumbotron-heading">{display.account.name}</h1>
                <p>Joined on {display.account.to_char}</p>
                <form class="form-signin" method={display.method} action={display.formAction}>
                  <button class="btn btn-lg btn-primary btn-block" type="submit">{display.button}</button>
                </form>
              </div>

              <div class="col-sm">
                <h1>Feedr Info</h1>
                <div class="btn-group" role="group" aria-label="User Info">
                  <button class="btn btn-secondary" id="catadd" type="submit">Added</button>
                  <button class="btn btn-success" id="catfed" type="submit">Fed</button>
                  <button class="btn btn-info" id="catfollow" type="submit">Cats</button>
                  <button class="btn btn-warning" id="following" type="submit">Following</button>
                  <button class="btn btn-danger" id="followers" type="submit">Followers</button>
                </div>
                <hr/>
                <div class="card" id="user-info"></div>
              </div>

            </div>
          </section>
        </main>
        <script src="/script/userInfo.js"/>
        <script dangerouslySetInnerHTML={ {__html:`var user_id = '${display.account.id}';`}}/>
      </LAYOUT>
    );
  }
}

module.exports = Profile;