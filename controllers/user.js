const sha256 = require('js-sha256');
const SALT = 'feedr';

module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let getNewUser = (request, response) => {
    // respond with HTML page with form to register
    db.users.newUser((error, account) => {
      response.render('user/account', { account });
    });
  };

  let postNewUser = (request, response) => {
    let newUser = request.body;
    // check if name already exist
    db.users.checkUserName(newUser.name, (error, result) => {
      // if exist, request another name
      if (result !== null) {
        let account = {};
        account.title = "Register Account";
        account.message = "Name already taken, please choose another name.";
        account.formAction = "/register";
        account.user = 0;
        response.render('user/account', { account });
      } else {
        // INSERT new user into user db
        newUser.password = sha256(newUser.password + SALT);
        db.users.registerUser(newUser, (error, account) => {
          // set cookies
          response.cookie('name', account[0].name);
          response.cookie('loggedIn', account[0].password);
          // redirect to homepage
          response.redirect('/');
        });
      }
    });
  };

  let getUser =  (request, response) => {
    // respond with HTML page with form to login
    db.users.currentUser((error, account) => {
      response.render('user/account', { account });
    });
  };

  let postUser = (request, response) => {
    // check user login
    let user =  request.body;
    // check if name is correct
    db.users.checkUserName(user.name, (error, result) => {
      // if name match
      if (result !== null) {
        // check password
        user.password = sha256(user.password + SALT);
        if (user.password === result[0].password) {
          // set cookies
          response.cookie('name', result[0].name);
          response.cookie('loggedIn', result[0].password);
          // redirect to homepage
          response.redirect('/');
        } else {
            // inform incorrect password
            db.users.wrongPassword((error, account) => {
              response.render('user/account', { account });
            });
        }
      } else {
        // inform incorrect name
        db.users.wrongName((error, account) => {
            response.render('user/account', { account });
        });
      }
    });
  };

  let exitUser = (request, response) => {
    // clear cookies
    response.clearCookie('loggedIn');
    response.clearCookie('name');
    response.redirect('/');
  };

  let showUser =  (request, response) => {
    // respond with HTML page of user
    let user_id = request.params.id;
    db.users.getUserName(user_id, (error, account) => {
      let user = {};
      user.account = account[0]
      if (request.cookies.name === user.account.name) {
        user.formAction = "/user/" + user.account.id + "/edit";
        user.button = "Update";
      }
      // if is not same user, allow follow
      // let currentUser = request.cookies.name;
      // let loggedIn = request.cookies.loggedIn;
      response.render('user/profile', user )
    });
  };

  let editUser = (request, response) => {
    // check user login
    let user =  request.cookies.name;
    let loggedIn = request.cookies.loggedIn;
    // check if name is correct
    db.users.checkUserName(user, (error, result) => {
      // if name match
      if (user === result[0].name) {
        // check password
        if (loggedIn === result[0].password) {
          // respond with HTML page with form to edit user
          let account = {};
          account.title = "Update Account";
          account.formAction = "/user/" + result[0].id +"/?_method=put";
          account.user = result[0];
          response.render('user/account', { account });
        } else {
            // inform incorrect password
            db.users.wrongPassword((error, account) => {
              response.render('user/account', { account });
            });
        }
      } else {
        // inform incorrect name
        db.users.wrongName((error, account) => {
            response.render('user/account', { account });
        });
      }
    });
  };

  let putUser = (request, response) => {
    // update user information
    console.log("Updating user info.")
    let user_id = request.params.id;
    let user = request.body;
    // check if name already exist
    db.users.checkUserName(user.name, (error, result) => {
      // if exist, request another name
      if (result !== null) {
        let account = {};
        account.title = "Update Account";
        account.message = "Name already taken, please choose another name.";
        account.formAction = "/user/" + user_id +"/?_method=put";
        account.user = result[0];
        response.render('user/account', { account });
      } else {
        // UPDATE info into user db
        user.password = sha256(user.password + SALT);
        user.id = user_id;
        db.users.updateUser(user, (error, account) => {
          // clear cookies
          response.clearCookie('loggedIn');
          response.clearCookie('name');
          // set new.cookies
          response.cookie('name', account[0].name);
          response.cookie('loggedIn', account[0].password);
          // redirect to profile page
          response.redirect('/user/' + account[0].id);
        });
      }
    });
  };
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newUser: getNewUser,
    registerUser: postNewUser,
    currentUser: getUser,
    loginUser: postUser,
    logoutUser: exitUser,
    showUser, editUser,
    updateUser: putUser
  };

}