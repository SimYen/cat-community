var React = require("react");
const LAYOUT = require('./../layout.jsx');

class User extends React.Component {
  render() {
    let display=this.props.account;
    return (
      <LAYOUT>
        <main role="main">
          <section class="jumbotron text-center">
            <div class="container">
              <img class="mb-4" src="/image/beLeafInYourself.jpg" alt="" width="200" height="200"/>
              <h1 class="jumbotron-heading">{display.title}</h1>
                <form class="form-signin" method="POST" action={display.formAction}>
                  <p class="text-danger">{display.message}</p>
                  <label for="userName" class="sr-only">Username</label>
                    <input type="text" id="userName" name="name" class="form-control" defaultValue={display.user.name} placeholder="Username" required autofocus/>
                  <label for="password" class="sr-only">Password</label>
                    <input type="password" id="password" name="password" class="form-control" placeholder="Password" required/>
                  <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                </form>
            </div>
          </section>
        </main>
      </LAYOUT>
    );
  }
}

module.exports = User;