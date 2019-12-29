let async = require('async'),
parseString = require('xml2js').parseString;
 
let productQuery = require('../queries/productQuery'),
util = require('../config/util');
//config = require("../Utilities/config").config;
 
 
/**API to create the atricle */
let createProduct = (data, callback) => {
    async.auto({
        product: (cb) => {
            productQuery.createProduct(data, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                    return;
                }
            
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":data });
            });
        }
    //]
    }, (err, response) => {
        callback(response.product);
    });
}
 
/**API to update the product *
let updateProduct = (data,callback) => {
    async.auto({
        productUpdate :(cb) =>{
            if (!data.id) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            console.log('phase 1');
            var criteria = {
                id : data.id,
            }
            var dataToSet={
                "category": data.category,
                "title":data.title,
            }
            console.log(criteria,'test',dataToSet);
            productQuery.updateProduct(criteria, dataToSet, (err, dbData)=>{
                if(err){
                    cb(null,{"statusCode":util.statusCode.FOUR_ZERO_ONE,"statusMessage":util.statusMessage.SERVER_BUSY});
                    return; 
                }
                else{
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":dataToSet });                        
                }
            });
            }
        }, (err,response) => {
        callback(response.productUpdate);
    });
}/*
 
/**API to delete the subject */
let deleteProduct = (data,callback) => {
    console.log(data,'data to set')
    async.auto({
        removeProduct :(cb) =>{
            if (!data.id) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                id : data.id,
            }
            productQuery.deleteProduct(criteria,(err,dbData) => {
            if (err) {
                console.log(err);
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                return;
            }
            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DELETE_DATA });
        });
    }
    }, (err,response) => {
        callback(response.removeProduct);
    });
}
 
/***API to get the product list */
let getProduct = (data, callback) => {
    async.auto({
        product: (cb) => {
            productQuery.getProducts({},(err, data) => {
                if (err) {
                    cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                    return;
                }
                cb(null, data);
                return;
            });
        }
    }, (err, response) => {
        callback(response.product);
    })
}
 
/***API to get the product detail by id */
let getProductById = (data, callback) => {
    async.auto({
        product: (cb) => {
            let criteria = {
                "id":data.id
            }
            productQuery.getProductDetail(criteria,(err, data) => {
                if (err) {
                    console.log(err,'error----');
                    cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                    return;
                }
                cb(null, data[0]);
                return;
            });
            }
        }, (err, response) => {
        callback(response.product);
    })
}
 
module.exports = {
    createProduct : createProduct,
    //updateProduct : updateProduct,
    deleteProduct : deleteProduct,
    getProduct : getProduct,
    getProductById : getProductById
};