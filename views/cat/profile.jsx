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
              <img class="mb-4" src="/image/iveFallenForYou.jpg" alt="" width="200" height="200"/>
              <h1 class="jumbotron-heading">{display.cat.name}</h1>
              <p>Description: {display.cat.description}<br/>
              Location: {display.cat.location}<br/>
              Added by: <a href={"/user/" + display.cat.user_id}>{display.user_name}</a> on {display.cat.to_char}</p>
              <form class="form-signin" method="GET" action={"/cat/" + display.cat.id + "/edit"}>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Update</button>
              </form>
              <form class="form-signin" method={display.method} action={display.formAction}>
                <button class="btn btn-lg btn-info btn-block" type="submit">{display.button}</button>
              </form>
              <form class="form-signin" method="POST" action={"/fed/" + display.cat.id + "?_method=put"}>
                <button class="btn btn-lg btn-warning btn-block" type="submit">{"Feed " + display.cat.name}</button>
              </form>
            </div>

            <div class="col-sm">
              <h1>Cat Info</h1>
              <div class="card" id="cat-info"></div>
            </div>

            </div>
          </section>
        </main>
        <script src="/script/catinfo.js"/>
        <script dangerouslySetInnerHTML={ {__html:`var cat_id = '${display.cat.id}';`}}/>
      </LAYOUT>
    );
  }
}

module.exports = Profile;