const jwt = require('jsonwebtoken')
require("dotenv").config()

//this is used to check the front end to see if the token is real
module.exports = async (req, res, next) => {
  const jwtToken = req.header("token")
  
  if(!jwtToken){
    return res.status(403).json({msg: "authorization denied"})
  }

  try{
    //checks if the token is real and we can use it as a payload in our routes
    const payload = jwt.verify(jwtToken, process.env.jwtSecret)

    req.user = payload.user
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorize")
  }
}