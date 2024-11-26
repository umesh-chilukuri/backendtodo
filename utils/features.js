

import jwt from "jsonwebtoken";


export const sendcookie=(user,res,message,statuscode=200)=>{
    const token =jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(statuscode)
    .cookie("token",token,{
        httpOnly: true, // Prevent access by JavaScript
        maxAge: 3600000,
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true, // 1 hour
    }).json({
        success:true,
        message:"registration success", 
    })
}