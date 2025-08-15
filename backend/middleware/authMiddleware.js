const jwt = require('jsonwebtoken') // We import the jsonwebtoken library, which lets us create and verify JWT (JSON Web Tokens).
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// defining middleware function
/*
req → request object
res → response object
next → function to move on to the next middleware/route handler.
*/
const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization; // We retrieve the Authorization header from the incoming HTTP request.
    const token = authHeader && authHeader.split(' ')[1]; 
    /*
    First, we check if authHeader exists.
    If it exists, we split it by space:
    "Bearer <token>" → ["Bearer", "<token>"]
    .split(' ')[1] picks the second element, which is the actual JWT token string.
    If authHeader is missing, token becomes undefined.
    */
   if(!token)
   {
    return res.status(401).json({message : 'Acess Denied , Either login or sign up first'});
   }
   try
   {
    const decoded = jwt.verify(token,JWT_SECRET);
    /*
    jwt.verify(token, JWT_SECRET) checks:
    If the token was signed with the same secret key (JWT_SECRET)
    If the token is still valid (not expired)
    If valid, it returns the decoded payload (the data stored inside the token).
    Eg : decoded = { "id": 12, "email": "test@example.com", "iat": 1723540115, "exp": 1723543715 }
    */
    req.user = decoded;
    /*
    We store the decoded token data in req.user.
    This allows future middleware or routes to know which user is making the request without needing the token again.
    */
    next(); // If everything checks out, next() passes control to the next middleware or route handler.
   }catch(err){
    return res.status(403).json({message : 'Invalid or Expired Token'});
   }
}

module.exports = verifyToken;