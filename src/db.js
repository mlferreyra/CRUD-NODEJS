const mysql = require('mysql');
//uso el destructuring para extraer de KEYS el 'database'
const { database } = require('./keys');
//funcion que crea la conección
const pool = mysql.createPool(database);
const { promisify } = require('util');

pool.getConnection((err, conn) => {
    if(err){
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.log('La conexión de la base de datos fue cerrada');
        }
        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.log('La base de datos tiene muchas conexiones');
        }
        if(err.code == 'ECONNREFUSED'){
            console.log('La coneXión de la base de datos fue rechazada');
        }
    }
    if(conn) conn.release();
    console.log('DB conectada')
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;