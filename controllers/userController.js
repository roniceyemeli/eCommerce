const Users = require('../models/User');
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const token_access_secret = config.get('token_access_secret')




const userController = {

    register : async(req, res) =>{
        try {
            const {fullName, email, password} = req.body;
            const user = await Users.findOne({email});
            if (user) return res.status(404).json({msg:"seem like this email is already registered"});
            
            //crypt the new password with brcyptjs
            const passwordHash = await bc.hash(password, 10)
            
            const newUser = await new Users({fullName, email, password: passwordHash})

            //save the newuser
            await newUser.save();

            //create the jsonwebtoken for authentification
            const accessToken = createAccessToken({id: newUser._id});
            // const refreshToken = createRefreshToken({id: newUser._id});

            res.json({accessToken, 
            user:{
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                phone: newUser.phone,
                password: newUser.password,
            }});

        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    login : async(req, res) =>{

    },
    logout : async(req, res) =>{

    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, token_access_secret, {expiresIn:'7d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user,token_access_secret, {expiresIn:'14d'} )
}

module.exports = userController;