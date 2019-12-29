const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')


module.exports = {
    
    login: async function(req, res, next) { 
        const body = req.body;
        authService.checkUser(body, (data) => {
            if(data)
            {
                var payload = {
                    userId: data.id,
                    userName: data.username
                }
                var token = jwt.sign(payload, 'dskdnsdkbskadseasjdhcbajcret', {expiresIn: '2h'});
                return res.status(200).json({token});
            }
            else{
                return res.status(401).json({});
            }
        });
        
    },
}