module.exports = (app, allModels) => {

  /*
   *  =========================================
   *    ALL ROUTES FOR FEEDR
   *  =========================================
   */

  // require the controllers
  const userController = require('./controllers/user')(allModels);
  const catController = require('./controllers/cat')(allModels);

  // users
  app.get('/register', userController.newUser);
  app.post('/register', userController.registerUser);
  app.get('/login', userController.currentUser);
  app.post('/login', userController.loginUser);
  app.get('/logout', userController.logoutUser);

  // cats
  app.get('/new', catController.newCat);
  app.post('/', catController.registerCat);
  app.get('/', catController.allCats);

};