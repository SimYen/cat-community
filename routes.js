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
  app.get('/user/:id/edit', userController.editUser);
  app.put('/user/:id', userController.updateUser);
  app.get('/user', userController.allUsers);

  app.post('/user/cat/:id', userController.followCat);
  app.delete('/user/cat/:id', userController.unfollowCat);
  app.post('/user/follow/:id', userController.followUser);
  app.delete('/user/follow/:id', userController.unfollowUser);

  // cats
  app.get('/new', catController.newCat);
  app.post('/', catController.registerCat);
  app.get('/', catController.allCats);
  app.get('/cat/:id', catController.showCat);
  app.get('/cat/:id/edit', catController.editCat);
  app.put('/cat/:id', catController.updateCat);
  app.put('/fed/:id', catController.feedCat);
  app.get('/cat/:id/fed', catController.catFed);
  app.get('/cat/:id/follow', catController.catFollow);
};