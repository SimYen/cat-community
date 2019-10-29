/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let registerCat = (newCat, callback) => {
    let input = [ newCat.name, newCat.description, newCat.location, newCat.user ];
    let query = 'INSERT INTO cats (name, description, location, user_id) VALUES ($1, $2, $3, $4) RETURNING *';

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

  let allCats = (callback) => {
    let query = 'SELECT cats.id, cats.name, cats.image, cats.user_id, users.name AS reg_by ' +
                'FROM cats JOIN users ON cats.user_id=users.id ' +
                'ORDER BY cats.added_at DESC';

    dbPoolInstance.query(query, (error, queryResult) => {
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

  let showCat = (cat, callback) => {
    let id = [ cat ];
    let query = 'SELECT id, name, description, location, to_char(added_at, \'DD/MM/YYYY\'), user_id, image ' +
                'FROM cats WHERE id=$1';

    dbPoolInstance.query(query, id, (error, queryResult) => {
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

  let updateCat = (cat, callback) => {
    let input = [ cat.update.name, cat.update.description, cat.update.location, cat.id ];
    let query = 'UPDATE cats SET name=$1, description=$2, location=$3 WHERE id=$4 RETURNING *';

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

  let fedCat = (cat, callback) => {
    let input = [ cat.id, cat.user ];
    let query = 'INSERT INTO cat_fed (cat_id, user_id) VALUES ($1, $2) RETURNING *';

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

  let fed = (cat, callback) => {
    let input = [ cat ];
    let query = 'SELECT to_char(cat_fed.fed_at, \'DD/MM/YYYY HH24:MI\'), users.name, users.id ' +
                'FROM cat_fed JOIN users ON cat_fed.user_id=users.id ' +
                'WHERE cat_fed.cat_id=$1 ORDER BY to_char DESC';

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

  let follow = (cat, callback) => {
    let input = [ cat ];
    let query = 'SELECT user_cat.user_id, users.name FROM user_cat JOIN users ' +
                'ON user_cat.user_id=users.id WHERE user_cat.cat_id=$1';

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

  let allFed = (callback) => {
    let query = 'SELECT cat_fed.cat_id, cats.name, to_char(cat_fed.fed_at, \'DD/MM/YYYY HH24:MI\'), users.name, users.id FROM cat_fed JOIN users ON cat_fed.user_id=users.id JOIN cats ON cat_fed.cat_id=cats.id ORDER BY to_char DESC';

    dbPoolInstance.query(query, (error, queryResult) => {
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

  let catPic = (id, url, callback) => {
    let input = [ id, url ];
    console.log(input);
    let query = "UPDATE cats SET image=$2 WHERE id=$1 RETURNING *";

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

  return {
    registerCat,
    allCats,
    showCat,
    updateCat,
    fedCat, fed,
    follow, allFed,
    catPic
  };
};