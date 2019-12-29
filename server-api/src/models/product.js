let mysqlConfig = require("../config/mysqlConfig");
 
let initialize = () => {
    mysqlConfig.getDB().query(`create table IF NOT EXISTS products (
        id INT auto_increment primary key, 
        sku VARCHAR(50), 
        name VARCHAR(100), 
        price VARCHAR(24), 
        quantity VARCHAR(24), 
        description TEXT
    )`);
}
 
module.exports = {
    initialize: initialize
}