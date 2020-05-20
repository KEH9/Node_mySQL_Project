const mysql = require('mysql');

// config access to DB
const config = {
  host: "localhost",
  user: "root",
  password: "256256ZZzz",
  database: "mydb"
};
exports.config = config;


// class for creating requests to db
class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  // execute query to DB 
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  // closing connection 
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}
exports.Database = Database;

