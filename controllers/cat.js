module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let getNewCat = (request, response) => {
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
            // respond with HTML page with form to add new cat
            console.log("register cat");
            let cat = {}
            cat.title = "New Cat";
            cat.formAction = "/";
            cat.cat = 0
            response.render('cat/cat', cat);
          }  else {
            // inform incorrect password
            db.users.wrongPassword((error, account) => {
              response.render('user/account', { account });
            });
          }
        }
      });
    }
  };

  let postNewCat = (request, response) => {
    // get user id
    let user = request.cookies.name;
    db.users.checkUserId(user, (error, result) => {
      // POST cat
      let cat = request.body;
      cat.user = result[0].id;
      db.cats.registerCat(cat, (error, result) => {
        // redirect to cat profile page
        console.log("cat registered");
        let cat_id = result[0].id;
        response.redirect('/cat/' + cat_id);
      });
    });
  };

  let getCats = (request, response) => {
    // respond with HTML page of all cats
    db.cats.allCats((error, result) => {
      let display = {};
      display.result = result;
      // check if user is login
      let user = request.cookies.name;
      if (user === undefined) {
        display.formAction1 = "/register";
        display.button1 = "Register";
        display.formAction2 = "/login";
        display.button2 = "Login";
        response.render('cat/index', display);
      } else {
          db.users.checkUserId(user, (error, account) => {
            display.user = user;
            display.formAction1 = "/user/" + account[0].id;
            display.button1 = "Your Profile";
            display.formAction2 = "/new";
            display.button2 = "Add A Cat";
            response.render('cat/index', display);
          });
      }
    });
  };

  let getCat = (request, response) => {
    // respond with HTML page of one cat
    let cat_id = request.params.id;
    console.log("getting cat profile");
    db.cats.showCat(cat_id, (error, result) => {
      let cat = {};
      cat.cat = result[0];
      cat.formAction = "/cat/" + cat_id + "/edit";
      // get name of user who register cat
      let user = result[0].user_id;
      db.users.getUserName(user, (error, result) => {
        cat.user_name = result[0].name;
        // check if user is login
        let user = request.cookies.name;
        if (user === undefined) {
          cat.method = "POST";
          cat.formAction = "/user/cat/" + cat_id;
          cat.button = "Follow";
          response.render('cat/profile', cat );
        } else {
          // check if viewer is following cat
          db.users.checkUserId(request.cookies.name, (error, account) => {
            let input = {};
            input.user_id = account[0].id;
            input.cat_id = cat_id;
            db.users.getFollowCat(input, (error, result) => {
              if (result === null) {
                cat.method = "POST";
                cat.formAction = "/user/cat/" + cat_id;
                cat.button = "Follow";
                response.render('cat/profile', cat );
              } else {
                  cat.method = "POST";
                  cat.formAction = "/user/cat/" + cat_id + "/?_method=delete";
                  cat.button = "Unfollow";
                  response.render('cat/profile', cat );
              }
            });
          });
        }
      });
    });
  };

  let editCat = (request, response) => {
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
            // respond with HTML page with form to edit cat
            console.log("update cat info");
            let cat_id = request.params.id;
            db.cats.showCat(cat_id, (error, result) => {
              let cat = {};
              cat.title = "Update Cat Status";
              cat.formAction = "/cat/" + cat_id + "/?_method=put";
              cat.cat = result[0];
              response.render('cat/cat', cat);
            });
          }  else {
            // inform incorrect password
            db.users.wrongPassword((error, account) => {
              response.render('user/account', { account });
            });
          }
        }
      });
    }
  };

  let putCat = (request, response) => {
    let user = request.cookies.name;
    db.users.checkUserId(user, (error, result) => {
      // update cat information
      let cat = {};
      cat.id = request.params.id;
      cat.update = request.body;
      db.cats.updateCat(cat, (error, result) => {
        console.log("cat info updated");
        let cat_id = result[0].id;
        response.redirect('/cat/' + cat_id);
      });
    });
  };

  let feedCat = (request, response) => {
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
            // update cat fed
            let cat = {};
            cat.id = request.params.id;
            cat.user = result[0].id;
            db.cats.fedCat(cat, (error, result) => {
              console.log("cat fed");
              let cat_id = result[0].cat_id;
              response.redirect('/cat/' + cat_id);
            });
          }  else {
            // inform incorrect password
            db.users.wrongPassword((error, account) => {
              response.render('user/account', { account });
            });
          }
        }
      });
    }
  };

  let catFed = (request, response) => {
    let cat = request.params.id;
    db.cats.fed(cat, (error, result) => {
      console.log("cat fed info");
      response.send( result );
    });
  };

  let catFollow = (request, response) => {
    let cat = request.params.id;
    db.cats.follow(cat, (error, result) => {
      console.log("cat followers");
      response.send( result );
    });
  };

  let catsFed = (request, response) => {
    db.cats.allFed((error, result) => {
      console.log("cats fed");
      response.send({ result });
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newCat: getNewCat,
    registerCat: postNewCat,
    allCats: getCats,
    showCat: getCat,
    editCat,
    updateCat: putCat,
    feedCat, catFed,
    catFollow, catsFed
  };

}