var productService = require('../services/productService');

module.exports = {
    
    view: async function(req, res, next) {
        
        productService.getProduct({}, (data) => {
            console.log("Controller", data);
            if(data)
                return res.status(200).json({ products: data });
            else{
                return res.status(401).json({});
            }
        });
        
    },
    create: async function(req, res, next) {
        const body = req.body;
        console.log("Controller", body);
        productService.createProduct(body, (data) => {
            console.log("Controller", data);
            if(data)
                return res.status(200).json( data );
            else{
                return res.status(401).json({});
            }
        });
        
    },
    /*update: async function(req, res, next) {
        const body = req.body;
        console.log("Controller", body);
        productService.checkUser(body, (data) => {
            console.log("Controller", data);
            if(data)
                return res.status(200).json({ customer: data });
            else{
                return res.status(401).json({});
            }
        });
        
    },*/
    delete: async function(req, res, next) {
        const id = parseInt(req.query.id)
        productService.deleteProduct({id:id}, (data) => {
            console.log("Controller", data);
            if(data)
                return res.status(200).json(data);
            else{
                return res.status(401).json({});
            }
        });
        
    },
    details: async function(req, res, next) {
        const body = req.body;
        console.log("Controller", body);
        productService.getProductById(body, (data) => {
            console.log("Controller", data);
            if(data)
                return res.status(200).json({ customer: data });
            else{
                return res.status(401).json({});
            }
        });
        
    },
}