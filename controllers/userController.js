const Users = require('../models/User');
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const token_access_secret = config.get('token_access_secret');
const token_refresh_secret = config.get('token_refresh_secret');




const userController = {

    register : async(req, res) =>{
        const {name, email, password} = req.body;
        try {
            const user = await Users.findOne({email});
            if (user) return res.status(404).json({msg:"seem like this email is already registered"});
            
            if(password.length < 6){
                return res.status(400).json({msg:'password should be at least 6 charaters long'})
            }
            //crypt the new password with brcyptjs
            const passwordHash = await bc.hash(password, 10)
            
            const newUser = await new Users({name, email, password: passwordHash})

            //save the newuser
            await newUser.save();

            // create the jsonwebtoken for authentification
            const accesstoken = createAccessToken({id: newUser._id});
            const refreshtoken = createRefreshToken({id: newUser._id});

            // we set the cookies
            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 //7d
            })

            // response to our query
            res.json({accesstoken});
            res.json({newUser})

        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    login : async(req, res) =>{
        const {email, password} = req.body;
        try {
            //checking if the user exist in our database or not
            const user = await Users.findOne({email});
            if(!user) return res.status(404).json({msg:"Sorry seem like this user doesn't exist "});

            //we compare the password entered by the user with the one registered in our database using bcryptjs to decode
            const isMatch = await bc.compare(password, user.password)
            if(!isMatch) return res.status(404).json({msg:"Bad credentials"})

            //if login succeed , we create a token for the curent user
            const accesstoken = createAccessToken({id: user._id});
            const refreshtoken = createRefreshToken({id: user._id});

            //we set the cookies after login
            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 //7d
            })

            res.json({accesstoken})


        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    logout : async(req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg:"Signed out"})
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    refreshToken:(req, res) =>{
        try {
             //we verify our token in the cookies 
        const r_token = req.cookies.refreshtoken;
        if(!r_token) return res.status(404).json({msg:"Please login or register"});

        jwt.verify(r_token, token_refresh_secret, (err, user) => {
            if (err) return res.status(404).json({msg: "Please login or register"});

            //we create a new token (refreshing)
            const accesstoken = createAccessToken({id: user.id}) ;

            res.json({accesstoken})
        })
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getUser: async (req, res) =>{
        try {
            //find the user by his id
            const user = await Users.findById(req.user.id).select('-password');
            if(!user) return res.status(404).json({msg: "This user does not exist !"});

            //query response
            res.json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    addCart: async (req, res) =>{
        try {
            //we find a user
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg:'User does not exist'})
            
            //we update his cart content
            await Users.findOneAndUpdate({_id: req.user.id}, { cart: req.body.cart})
            
            return res.json({msg:'Added to cart'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, token_access_secret, {expiresIn:'1d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user,token_refresh_secret, {expiresIn:'7d'} )
}

module.exports = userController;