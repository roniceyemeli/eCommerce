const config = require('config');
const token_access_secret = config.get('token_access-secret');
const User = require('../models/User');
const jwt = require('jsonwebtoken');



const Auth = (res, req, next) => {
    const token = req.header('Authorization');
    if(!token) {
        res.status(404).json({msg: "Invalid Authentification"})
    }
    try {
        //we decode the user passwword and verify if it fit with the one stored in th database
        const decoded = jwt.verify(token, token_access_secret);
        const user = await User.findById(decoded.id).select('-password')
        if(!user){
            return res.status(404).json({msg: "not Authorized"})
        }
        else{
            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = Auth;