var multer = require('multer');
var upload = multer({ dest: './uploads/' });

//load module
var cloudinary = require('cloudinary');

var configForCloudinary;
if( process.env.CLOUDINARY_URL ){   //FOR HEROKU
  configForCloudinary = process.env.CLOUDINARY_URL;
}else{ // FOR LOCAL
  configForCloudinary = require('config.json');
}
cloudinary.config(configForCloudinary);

module.exports = (app, allModels) => {

  /*
   *  =========================================
   *    ALL ROUTES FOR FEEDR
   *  =========================================
   */

  // require the controllers
  const userController = require('./controllers/user')(allModels);
  const catController = require('./controllers/cat')(allModels, cloudinary);

  // users
  app.get('/register', userController.newUser);
  app.post('/register', userController.registerUser);
  app.get('/login', userController.currentUser);
  app.post('/login', userController.loginUser);
  app.get('/logout', userController.logoutUser);
  app.get('/user/:id', userController.showUser);
  app.get('/user/:id/edit', userController.editUser);
  app.put('/user/:id', userController.updateUser);
  app.get('/users', userController.allUsers);

  app.post('/user/cat/:id', userController.followCat);
  app.delete('/user/cat/:id', userController.unfollowCat);
  app.post('/user/follow/:id', userController.followUser);
  app.delete('/user/follow/:id', userController.unfollowUser);
  app.get('/user/:id/cat', userController.catFollow);
  app.get('/user/:id/follow', userController.following);
  app.get('/user/:id/following', userController.follower);
  app.get('/user/:id/add', userController.catAdd);
  app.get('/user/:id/fed', userController.fedCat);

  // cats
  app.get('/new', catController.newCat);
  app.post('/', catController.registerCat);
  app.get('/', catController.all);
  app.get('/cat/:id', catController.showCat);
  app.get('/cat/:id/edit', catController.editCat);
  app.put('/cat/:id', catController.updateCat);
  app.put('/fed/:id', catController.feedCat);
  app.get('/cat/:id/fed', catController.catFed);
  app.get('/cat/:id/follow', catController.catFollow);
  app.get('/catsfed', catController.catsFed); // unused, to refine search to include non fed cats
  app.get('/cats', catController.allCats);
  app.post('/cat/:id/pic', upload.single('myFile'), catController.catPic);
};