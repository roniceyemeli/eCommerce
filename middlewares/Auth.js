const config = require('config');
const token_access_secret = config.get('token_access_secret');
const jwt = require('jsonwebtoken');

const Auth =  (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if(!token) {
            res.status(404).json({msg: "Invalid Authentification"})
        }
        //we decode the user passwword and verify if it fit with the one stored in th database
        const decoded = jwt.verify(token, token_access_secret, (err, user) =>{
            if(err) return res.status(404).json({msg: 'Not Authorized'})
        
            req.user = user;
        });
        
        next();
        
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = Auth;