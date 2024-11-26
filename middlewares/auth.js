

import jwt from "jsonwebtoken";
import  {User} from "../models/user.js";

export const isauthenticated= async(req,res,next)=>{
    const {token}=req.cookies;
    console.log("th e token is",token);
    if(!token){
        return res.status(404).json({
            succes:false,
            message:"login chesko ra",
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)

    

   req.user=await User.findById(decoded._id);
   next();

}