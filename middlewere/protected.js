import Auth from "../models/authSchema.js";
import generateToken from "../utils/generateToken.js";
import jwt from 'jsonwebtoken'

export const authProtected=async(req,res,next)=>{
  try {
      const token=req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({
        message:'No token provided'
    })
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user= await Auth.findById(decoded.id).select('-password')
    
    next()
  } catch (error) {
    res.json({
        message:'Invalid token or Expired token',
        error:error.message
    })
  }
}