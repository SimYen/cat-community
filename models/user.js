/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let newUser = (callback) => {
    let account = {};
    account.title = "Register Account";
    account.formAction = "/register";
    account.user = 0;
    callback(null, account);
  };

  let checkUserName = (userName, callback) => {
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
    account.title = "Login Account";
    account.formAction = "/login";
    account.user = 0;
    callback(null, account);
  };

  let wrongPassword = (callback) => {
    let account = {};
    account.title = "Login Account";
    account.message = "Incorrect password, please try again.";
    account.formAction = "/login";
    account.user = 0;
    callback(null, account);
  };

  let wrongName = (callback) => {
    let account = {};
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

  return {
    newUser,
    checkUserName,
    registerUser,
    currentUser,
    wrongPassword,
    wrongName,
    getUserName,
    updateUser
  };
};