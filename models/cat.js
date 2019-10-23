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
    let query = 'SELECT cats.id, cats.name, cats.user_id, users.name AS reg_by ' +
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
    let query = 'SELECT * FROM cats WHERE id=$1';

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

  return {
    registerCat,
    allCats,
    showCat
  };
};