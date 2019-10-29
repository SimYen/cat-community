var React = require("react");
const LAYOUT = require('./../layout.jsx');

class Profile extends React.Component {
  render() {
    let display = this.props;
    if ( display.cat.image === null ) {
        display.cat.image = "/image/iveFallenForYou.jpg";
    }
    return (
      <LAYOUT>
        <main role="main">
          <section class="jumbotron text-center">
            <div class="row">

              <div class="col-sm col-md-5">
                <img class="mb-4" src={display.cat.image} alt="" width="200" height="200"/>
                <form class="form-signin" enctype="multipart/form-data" method="POST" action={"/cat/" + display.cat.id + "/pic"}>
                    <div class="form-group">
                      <label for="catPic" class="sr-only">Update Cat Pic</label>
                      <input type="file" class="form-control-file" id="catPic" name="myFile" aria-describedby="catPic"/>
                      <small id="catPic" class="form-text text-muted">Do you have the latest pic of kitty to share?</small>
                    </div>
                    <button type="button" class="btn btn-info btn-sm" type="submit">Update Picture</button>
                </form>
                <h1 class="jumbotron-heading">{display.cat.name}</h1>
                <p>Description: {display.cat.description}<br/>
                  Location: {display.cat.location}<br/>
                  Added by: <a href={"/user/" + display.cat.user_id}>{display.user_name}</a> on {display.cat.to_char}</p>
                <form class="form-signin" method="GET" action={"/cat/" + display.cat.id + "/edit"}>
                  <button class="btn btn-lg btn-primary btn-block" type="submit">Update</button>
                </form>
                <form class="form-signin" method={display.method} action={display.formAction}>
                  <button class="btn btn-lg btn-warning btn-block" type="submit">{display.button}</button>
                </form>
                <form class="form-signin" method="POST" action={"/fed/" + display.cat.id + "?_method=put"}>
                  <button class="btn btn-lg btn-danger btn-block" type="submit">{"Feed " + display.cat.name}</button>
                </form>
              </div>

              <div class="col-sm col-md-7">
                <h1>Cat Info</h1>
                <div class="btn-group" role="group" aria-label="Cat Info">
                  <button class="btn btn-danger" id="catfed" type="button">Fed</button>
                  <button class="btn btn-warning" id="catfollow" type="button">Followers</button>
                </div>
                <hr/>
                <div class="card" id="cat-info"></div>
              </div>

            </div>
          </section>
        </main>
        <script src="/script/catInfo.js"/>
        <script dangerouslySetInnerHTML={ {__html:`var cat_id = '${display.cat.id}';`}}/>
      </LAYOUT>
    );
  }
}

module.exports = Profile;