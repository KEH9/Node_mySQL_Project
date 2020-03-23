const mysql = require( 'mysql' );

var config = {
  host: "localhost",
  user: "root",
  password: "256256ZZzz",
  database: "mydb"
};


class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
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


let database = new Database(config);

database.query( 'SELECT * FROM customers' )
.then( result => {
  console.log(result);
  return database.close();
}, err => {
  return database.close().then( () => { throw err; } )
} ).catch( err => {
  // handle the error
  console.log(err);
} );


