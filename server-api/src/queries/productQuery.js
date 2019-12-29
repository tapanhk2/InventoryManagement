let dbConfig = require("../config/mysqlConfig"); 
const tableName = 'products'; 
 
let getProducts = (criteria, callback) => {
    //criteria.aricle_id ? conditions += ` and aricle_id = '${criteria.aricle_id}'` : true;
    dbConfig.getDB().query(`select * from ${tableName} where 1`,criteria, callback);
}
 
let getProductDetail = (criteria, callback) => {
    let conditions = "";
    criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    dbConfig.getDB().query(`select * from ${tableName} where 1 ${conditions}`, callback);
}
 
let createProduct = (dataToSet, callback) => {
    let q = "INSERT INTO "+tableName+" (`id`, `sku`, `name`, `price`, `quantity`, `description`) VALUES (NULL, '"+dataToSet.sku+"', '"+dataToSet.name+"', '"+dataToSet.price+"', '"+dataToSet.quantity+"', '"+dataToSet.description+"')"
    console.log(q);
    dbConfig.getDB().query(q, callback);
    //dbConfig.getDB().query("insert into ${tableName} set ? ", dataToSet, callback);
}
 
let deleteProduct = (criteria, callback) => {
    let conditions = `id = '${criteria.id}'`;
    //criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    console.log(`delete from ${tableName} where  ${conditions}`);
    dbConfig.getDB().query(`delete from ${tableName} where  ${conditions}`, callback);
}
 
let updateProduct = (criteria,dataToSet,callback) => {
    let conditions = "";
    let setData = "";
    criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    dataToSet.category ? setData += `category = '${dataToSet.category}'` : true;
    dataToSet.title ? setData += `, title = '${dataToSet.title}'` : true;
    console.log(`UPDATE ${tableName} SET ${setData} where 1 ${conditions}`);
    dbConfig.getDB().query(`UPDATE ${tableName} SET ${setData} where 1 ${conditions}`, callback);
}
module.exports = {
    getProducts : getProducts,
    createProduct : createProduct,
    deleteProduct : deleteProduct,
    updateProduct : updateProduct,
    getProductDetail : getProductDetail
}