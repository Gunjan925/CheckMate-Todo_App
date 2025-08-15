const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

exports.signup = async (req,res) =>{
    const {username,email,password} = req.body;
    try 
    {
        const existingUser = await userModel.getUserByEmail(email);
        if(existingUser)
        {
            return res.status(400).json({message : 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10); // 10 salt rounds
        const userId = await userModel.createUser(username,email,hashedPassword);

        res.status(201).json({message : 'User created successfully',userId});
    }
    catch(err)
    {
        console.log("Error : ",err);
        res.status(500).json({message : 'Internal server error'});
    }
};

exports.login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await userModel.getUserByEmail(email);
        if(!user)
        {
            return res.status(404).json({message : 'User not found'});
        }

        const isMatch = await bcrypt.compare(password,user.user_hashed_password);
        /*bcrypt.compare:
        Extracts the salt & cost (rounds) from the stored hash,
        Re-hashes the incoming password with those,
        Compares in a timing-safe way.
        */
       if(!isMatch)
       {
        return res.status(404).json({message : 'Invalid credentials'});
       }
       // create jwt token
       const token = jwt.sign(
        {id:user.user_id, email:user.user_email},
        JWT_SECRET,
        {expiresIn:JWT_EXPIRES_IN}
       );

       return res.status(200).json({message : 'Login successful',token,user_name:user.user_name}); // sending to frontend
    }catch(err){
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logout = async (req, res) => {
  // For JWT, logout is handled client-side by deleting the token
  // But we can also use token blacklisting in DB for extra security
  res.status(200).json({ message: 'Logged out successfully' });
};
