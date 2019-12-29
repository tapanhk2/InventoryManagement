var config = require('../config/config')
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: config.dbhost,
    user: config.dbusername,
    password: config.dbpassword,
    database: config.dbdatabase,
});
 
connection.connect(() => {
    require('../models/user').initialize();
    require('../models/product').initialize();
});
 
let getDB = () => {
    return connection;
}
 
module.exports = {
getDB: getDB
}