/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let newUser = (callback) => {
    let account = {};
    account.img = "/image/beLeafInYourself.jpg";
    account.title = "Register Account";
    account.formAction = "/register";
    account.user = 0;
    callback(null, account);
  };

  let checkUserId = (userName, callback) => {
    let input = [ userName ];
    let query = 'SELECT * FROM users WHERE name=$1';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }
    // invoke callback function with results after query has executed
      if( queryResult.rows.length > 0 ){
        callback(null, queryResult.rows);
      }else{
        callback(null, null);
      }
    });
  };

  let registerUser = (newUser, callback) => {
    let input = [ newUser.name, newUser.password ];
    let query = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };


  let currentUser = (callback) => {
    let account = {};
    account.img = "/image/iFindYouVeryAppeeling.jpg";
    account.title = "Login Account";
    account.formAction = "/login";
    account.user = 0;
    callback(null, account);
  };

  let wrongPassword = (callback) => {
    let account = {};
    account.img = "/image/iFindYouVeryAppeeling.jpg";
    account.title = "Login Account";
    account.message = "Incorrect password, please try again.";
    account.formAction = "/login";
    account.user = 0;
    callback(null, account);
  };

  let wrongName = (callback) => {
    let account = {};
    account.img = "/image/iFindYouVeryAppeeling.jpg";
    account.title = "Login Account";
    account.message = "Incorrect name, please try again.";
    account.formAction = "/login";
    account.user = 0;
    callback(null, account);
  };

  let getUserName = (id, callback) => {
    let input = [ id ];
    let query = 'SELECT id, name, to_char(joined_at, \'DD/MM/YYYY\') FROM users WHERE id=$1';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }
    // invoke callback function with results after query has executed
      if( queryResult.rows.length > 0 ){
        callback(null, queryResult.rows);
      }else{
        callback(null, null);
      }
    });
  };

  let checkName = (user, callback) => {
    let input = [ user.name, user.id ];
    let query = 'SELECT * FROM users WHERE name=$1 AND id<>$2';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }
    // invoke callback function with results after query has executed
      if( queryResult.rows.length > 0 ){
        callback(null, queryResult.rows);
      }else{
        callback(null, null);
      }
    });
  };

  let updateUser = (user, callback) => {
    let input = [ user.name, user.password, user.id ];
    let query = 'UPDATE users SET name=$1, password=$2 WHERE id=$3 RETURNING *';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let followCat = (follow, callback) => {
    let input = [ follow.user_id, follow.cat_id ];
    let query = 'INSERT INTO user_cat (user_id, cat_id) VALUES ($1, $2) RETURNING *';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let unfollowCat = (unfollow, callback) => {
    let input = [ unfollow.user_id, unfollow.cat_id ];
    let query = 'DELETE FROM user_cat WHERE user_id=$1 AND cat_id=$2 RETURNING *';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let getFollowCat = (data, callback) => {
    let input = [ data.user_id, data.cat_id ];
    let query = 'SELECT * FROM user_cat WHERE user_id=$1 AND cat_id=$2';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  }

  let getFollowCats = (user, callback) => {
    let input = [ user ];
    let query = 'SELECT user_cat.cat_id, cats.name, cats.location FROM user_cat JOIN cats ' +
                'ON user_cat.cat_id=cats.id WHERE user_cat.user_id=$1';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  }

  let getCatsAdd = (user, callback) => {
    let input = [ user ];
    let query = 'SELECT id, name, location FROM cats WHERE user_id=$1 ORDER BY added_at DESC';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let getCatsFed = (user, callback) => {
    let input = [ user ];
    let query = 'SELECT cat_fed.cat_id, cats.name, to_char(cat_fed.fed_at, \'DD/MM/YYYY HH24:MI\') ' +
                'FROM cat_fed JOIN cats ON cat_fed.cat_id=cats.id ' +
                'WHERE cat_fed.user_id=$1 ORDER BY to_char DESC';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let follow = (follow, callback) => {
    let input = [ follow.user_id, follow.follower_id ];
    let query = 'INSERT INTO followers (user_id, follower_id) VALUES ($2, $1) RETURNING *';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let unfollow = (unfollow, callback) => {
    let input = [ unfollow.user_id, unfollow.follower_id ];
    let query = 'DELETE FROM followers WHERE user_id=$2 AND follower_id=$1 RETURNING *';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let getFollow = (data, callback) => {
    let input = [ data.user_id, data.follower_id ];
    let query = 'SELECT * FROM followers WHERE user_id=$2 AND follower_id=$1';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  }

  let getFollowing = (user, callback) => {
    let input = [ user ];
    let query = 'SELECT followers.user_id, users.name FROM followers JOIN users ' +
                'ON followers.user_id=users.id WHERE followers.follower_id=$1';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  }

  let getFollower = (user, callback) => {
    let input = [ user ];
    let query = 'SELECT followers.follower_id, users.name FROM followers JOIN users ' +
                'ON followers.follower_id=users.id WHERE followers.user_id=$1';

    dbPoolInstance.query(query, input, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        // invoke callback function with results after query has executed
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  }

  let allUsers = (callback) => {
    let query = 'SELECT id, name, to_char(joined_at, \'DD/MM/YYYY\') FROM users ORDER BY joined_at DESC';

    dbPoolInstance.query(query, (error, queryResult) => {
      if( error ){
        callback(error, null);
      }
    // invoke callback function with results after query has executed
      if( queryResult.rows.length > 0 ){
        callback(null, queryResult.rows);
      }else{
        callback(null, null);
      }
    });
  };

  return {
    newUser,
    checkUserId, // check using name, includes password
    registerUser,
    currentUser,
    wrongPassword,
    wrongName,
    checkName,
    getUserName, // check using id, no password, date formatted
    updateUser,
    followCat, unfollowCat,
    getFollowCat, // check if following cat
    getFollowCats,
    getCatsAdd,
    getCatsFed,
    follow, unfollow,
    getFollow, // check if following user
    getFollowing,
    getFollower,
    allUsers
  };
};