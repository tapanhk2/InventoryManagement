const productController = require('../controllers/productController.js');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', isLoggedIn, productController.view);
router.post('/', isLoggedIn, productController.create);
router.delete('/', isLoggedIn, productController.delete);
//router.put('/', isLoggedIn, productController.update);


function isLoggedIn(req, res, next) {
	let token = getToken(req.headers);
	checkTokenValidity(token)
    return next();
	// if (req.isAuthenticated()) {
	// 	return next();
	// } else {
	// 	res.redirect('/auth');
	// }
}
function getToken(headers)
{
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
		} else {
		return null;
	}
}
function checkTokenValidity(jwtString)
{
	//var token = JWTDecode(jwtstring);
	var token = jwt.decode(jwtString);
	console.log('JWTDecode', token);
	// if( Date.now() < token.nbf*1000) {
	// 	throw new Error('Token not yet valid');
	// }
	// if( Date.now() > token.exp*1000) {
	// 	throw new Error('Token has expired');
	// }

	var userId = token.userId;
	var username = token.username;
}

module.exports = router;