/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let registerCat = (newCat, callback) => {
    let input = [ newCat.cat, newCat.user_id ];
    let query = 'INSERT INTO cats (cat, user_id) VALUES ($1, $2) RETURNING *';

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
    let query = 'SELECT cats.id, cats.cat, cats.user_id, users.name ' +
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

  return {
    registerCat,
    allCats
  };
};