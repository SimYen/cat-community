var React = require("react");
const LAYOUT = require('./../layout.jsx');

class Cat extends React.Component {
  render() {
    let display=this.props;
    if (display.cat) { console.log("updating cat info") } else { console.log("adding new cat") };
    return (
      <LAYOUT>
        <main role="main">
          <section class="jumbotron text-center">
            <div class="container">
              <img class="mb-4" src="/image/oneInAMelon.jpg" alt="" width="200" height="200"/>

              <h1 class="jumbotron-heading">{display.title}</h1>
              <form class="form-signin" method="POST" action={display.formAction}>
                <label for="catName" class="sr-only">Cat Name</label>
                  <input type="text" id="catName" name="name" class="form-control" defaultValue={display.cat.name} placeholder="Cat name" required autofocus/>
                <label for="description" class="sr-only">Description</label>
                  <input type="text" id="description" name="description" class="form-control" defaultValue={display.cat.description} placeholder="Description of cat" required/>
                <label for="location" class="sr-only">Location</label>
                  <input type="text" id="location" name="location" class="form-control" defaultValue={display.cat.location} placeholder="Location of cat" required/>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
              </form>
            </div>
          </section>
        </main>
      </LAYOUT>
    );
  }
}

module.exports = Cat;