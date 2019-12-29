let dbConfig = require("../config/mysqlConfig"); 

const tableName = 'users'
 
let getUser = (criteria, callback) => {
    let conditions = ` username = '${criteria.username}' and password = '${criteria.password}'`;
    dbConfig.getDB().query(`select * from ${tableName} where ${conditions}`, callback);
}

module.exports = {
    getUser : getUser
}