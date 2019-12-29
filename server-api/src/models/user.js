let mysqlConfig = require("../config/mysqlConfig");
 
let initialize = () => {
    mysqlConfig.getDB().query(`create table IF NOT EXISTS users (
        id INT auto_increment primary key, 
        name VARCHAR(50), 
        username VARCHAR(24), 
        password VARCHAR(24)
    )`);
}
 
module.exports = {
    initialize: initialize
}