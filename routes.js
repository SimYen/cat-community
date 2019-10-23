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
  app.get('/user/:id', userController.showUser);

  // cats
  app.get('/new', catController.newCat);
  app.post('/', catController.registerCat);
  app.get('/', catController.allCats);
  app.get('/cat/:id', catController.showCat);
  app.get('/cat/:id/edit', catController.editCat);
  app.put('/cat/:id', catController.updateCat);
};