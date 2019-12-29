let async = require('async'),
parseString = require('xml2js').parseString;
 
let util = require('../config/util'),
authQuery = require('../queries/authQuery');

let checkUser = (data, callback) => {
    async.auto({
        user: (cb) => {
            let criteria = {
                "username": data.username,
                "password": data.password
            }
            authQuery.getUser(criteria,(err, data) => {
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
        callback(response.user);
    })
}
let checkAuth = (data, callback) => {
    async.auto({
        user: (cb) => {
            let criteria = {
                "username": data.username,
                "id": data.id
            }
            authQuery.getUser(criteria,(err, data) => {
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
        callback(response.user);
    })
}
module.exports = {
    checkUser : checkUser,
    checkAuth : checkAuth
};