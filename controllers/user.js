

import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { sendcookie } from "../utils/features.js";
//import { sendcookie } from "../utils/features.js";

export const getAllusers=async (req,res)=>{

  const users=await User.find({});
  const keyword=req.query.keyword;
  console.log(keyword);


    res.json({
        success:true,
        users,
    })
}

export const getmydetails=(req,res)=>{
    try{
   
    res.json({
        success:true,
        user:req.user,
    })
    }
    catch(err){
        console.log(err);
    }

}


export const login=async(req,res,next)=>{

    
        const {  email,password } = req.body;
    
        try {
            const user = await User.findOne({ email}).select("+password");
            if (user) {
    
                const ismatched=await bcrypt.compare(password,user.password)
                if(!ismatched){
                   return res.status(404).json({
                        success:false,
                        message:"password is in correct",
                    })
    
                }
                else{
                    sendcookie(user,res,`welcome back,${user.name}`,201)
                }
                
            } else {
                return res.status(404).json({
                    success:false,
                    message:"user already exists",
                 });
            }
        } catch (err) {
            console.log(err);
            res.send("something wrong has happend");
        }
    };
    
 export const logout=async(req,res)=>{
    res.status(200).cookie("token","",{expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true, 
    }).json({
        success:true,
        message:"logout succesfull",
    })
 };   


export const register=async (req,res)=>{
    const {name,email,password}=req.body;
     console.log(name);
     let user=await User.findOne({email});
     if(user)  return res.status(404).json({
        success:false,
        message:"user already exists",
     });

     else{
        const hassedPassword=await bcrypt.hash(password,10)
       user= await User.create({name,email,password:hassedPassword})
    sendcookie(user,res,"registration success",201)
    }
 
}


