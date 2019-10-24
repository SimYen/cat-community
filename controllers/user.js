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
    console.log("register user");
    db.users.newUser((error, account) => {
      response.render('user/account', { account });
    });
  };

  let postNewUser = (request, response) => {
    let newUser = request.body;
    // check if name already exist
    db.users.checkUserId(newUser.name, (error, result) => {
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
    console.log("login user");
    db.users.currentUser((error, account) => {
      response.render('user/account', { account });
    });
  };

  let postUser = (request, response) => {
    // check user login
    let user =  request.body;
    // check if name is correct
    db.users.checkUserId(user.name, (error, result) => {
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
    console.log("logout user");
    response.clearCookie('loggedIn');
    response.clearCookie('name');
    response.redirect('/');
  };

  let showUser =  (request, response) => {
    // respond with HTML page of user
    let user_id = request.params.id;
    console.log("get user profile");
    db.users.getUserName(user_id, (error, account) => {
      let user = {};
      user.account = account[0]
      if (request.cookies.name === user.account.name) {
        user.method = "GET";
        user.formAction = "/user/" + user.account.id + "/edit";
        user.button = "Update";
      } else {
        user.method = "POST";
        user.formAction = "/user/follow/" + user_id;
        user.button = "Follow";
      }
      response.render('user/profile', user )
    });
  };

  let editUser = (request, response) => {
    // check user login
    let user =  request.cookies.name;
    let loggedIn = request.cookies.loggedIn;
    // check if name is correct
    db.users.checkUserId(user, (error, result) => {
      // if name match
      if (user === result[0].name) {
        // check password
        if (loggedIn === result[0].password) {
          // respond with HTML page with form to edit user
          console.log("update user account");
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
    let user_id = request.params.id;
    let user = request.body;
    // check if name already exist
    db.users.checkUserId(user.name, (error, result) => {
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
        console.log("updating user account");
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

  let postCat = (request, response) => {
    // check if user is login
    let user = request.cookies.name;
    if (user === undefined) {
      // redirect to login
      db.users.currentUser((error, account) => {
        response.render('user/account', { account });
      });
    } else {
      //check if password correct
      db.users.checkUserId(user, (error, result) => {
        // if name match
        if (result !== null) {
          // check password
          if ( request.cookies.loggedIn === result[0].password) {
            // add cat to user follow list
            console.log("follow cat");
            let follow = {}
            follow.user_id = result[0].id;
            follow.cat_id = request.params.id;
            db.users.followCat(follow, (error, result) => {
              response.send( result );
            });
          }  else {
            // inform incorrect password
            db.users.wrongPassword((error, account) => {
              response.render('user/account', { account });
            });
          }
        }
      })
    };
  };

  let deleteCat = (request, response) => {
    // get user id
    user = request.cookies.name;
    db.users.checkUserId(user, (error, result) => {
      // remove cat from user follow list
      console.log("unfollow cat");
      let unfollow = {}
      unfollow.user_id = result[0].id;
      unfollow.cat_id = request.params.id;
      db.users.unfollowCat(unfollow, (error, result) => {
        response.send( result );
      });
    });
  };

  let postFollow = (request, response) => {
    // check if user is login
    let user = request.cookies.name;
    if (user === undefined) {
      // redirect to login
      db.users.currentUser((error, account) => {
        response.render('user/account', { account });
      });
    } else {
      //check if password correct
      db.users.checkUserId(user, (error, result) => {
        // if name match
        if (result !== null) {
          // check password
          if ( request.cookies.loggedIn === result[0].password) {
            // add user to follow list
            console.log("follow user");
            let follow = {}
            follow.user_id = result[0].id;
            follow.follower_id = parseInt(request.params.id);
            db.users.follow(follow, (error, result) => {
              response.send( result );
            });
          }  else {
            // inform incorrect password
            db.users.wrongPassword((error, account) => {
              response.render('user/account', { account });
            });
          }
        }
      })
    };
  };

  let deleteFollow = (request, response) => {
    // get user id
    user = request.cookies.name;
    db.users.checkUserId(user, (error, result) => {
      // remove user from follow list
      console.log("unfollow user");
      let unfollow = {}
      unfollow.user_id = result[0].id;
      unfollow.follower_id = request.params.id;
      db.users.unfollow(unfollow, (error, result) => {
        response.send( result );
      });
    });
  };

  let getUsers = (request, response) => {
    // respond with HTML page of all users
    db.users.allUsers((error, result) => {
      let display = {};
      display.result = result;
      // check if user is login
      let user = request.cookies.name;
      if (user === undefined) {
        display.formAction1 = "/register";
        display.button1 = "Register";
        display.formAction2 = "/login";
        display.button2 = "Login";
        response.render('user/index', display);
      } else {
          db.users.checkUserId(user, (error, account) => {
            display.user = user;
            display.formAction1 = "/user/" + account[0].id;
            display.button1 = "Profile";
            display.formAction2 = "/new";
            display.button2 = "Add A Cat";
            response.render('user/index', display);
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
    updateUser: putUser,
    followCat: postCat,
    unfollowCat: deleteCat,
    followUser: postFollow,
    unfollowUser: deleteFollow,
    allUsers: getUsers
  };

}