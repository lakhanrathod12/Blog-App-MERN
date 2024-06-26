const jwt= require('jsonwebtoken')
const HttpError = require('../models/errorModel')

require('dotenv').config()

const authMiddleware = async(req,res,next)=>{
    const Authorization = req.headers.Authorization || req.headers.authorization;

    if(Authorization && Authorization.startsWith("Bearer")){
        const token = Authorization.split(' ')[1]
        // console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, info)=>{
            if(err){
                return next(new HttpError('Unauthorized. Invalid Token. why',403))
            }
            req.user=info;
            next()
        })
    }else{
        return next(new HttpError('Unauthorized. No token',402))
    }
}

module.exports = authMiddleware;