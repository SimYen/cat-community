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
      db.users.checkUserName(user, (error, result) => {
        // if name match
        if (result !== null) {
          // check password
          if ( request.cookies.loggedIn === result[0].password) {
            // respond with HTML page with form to add new cat
            let cat = {}
            cat.title = "New Cat";
            cat.formAction = "/";
            cat.cat = 0
            response.render('cat/cat', { cat });
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

  let postNewCat = (request, response) => {
    // get user id
    let user = request.cookies.name;
    db.users.checkUserName(user, (error, result) => {
      // POST cat
      let cat = request.body;
      cat.user = result[0].id;
      db.cats.registerCat(cat, (error, result) => {
        // redirect to homepage
        response.redirect('/');
      });
    });
  };

  let getCats = (request, response) => {
    // respond with HTML page of all cats
    db.cats.allCats((error, result) => {
      console.log(result);
      let display = {};
      display.result = result;
      // check if user is login
      let user = request.cookies.name;
      if (user === undefined) {
        display.formAction1 = "/register";
        display.button1 = "Register";
        display.formAction2 = "/login";
        display.button2 = "Login";
      } else {
          display.user = user;
          display.formAction1 = "/user/" + user;
          display.button1 = "Profile";
          display.formAction2 = "/new";
          display.button2 = "Add A Cat";
      }
      response.render('cat/index', display);
    });
  };

  let getCat = (request, response) => {
    // respond with HTML page of one cat
    let cat_id = request.params.id;
    console.log("Getting cats.id: " + cat_id);
    db.cats.showCat(cat_id, (error, result) => {
      let cat = {};
      cat.title = "Update Cat Information";
      cat.formAction = "/cat/" + cat_id + "?_method=put";
      cat.cat = result[0];
      console.log(cat);
      response.render('cat/cat', { cat });
    });
  }
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    newCat: getNewCat,
    registerCat: postNewCat,
    allCats: getCats,
    showCat: getCat
  };

}