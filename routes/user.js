import express from 'express';
//import User from '../controllers/user.js';
import { getAllusers,register,getmydetails,login,logout } from '../controllers/user.js';
import { isauthenticated } from '../middlewares/auth.js';


const router=express.Router();

router.get("/all",getAllusers);
router.post("/login",login)
router.post("/new",register);
router.get("/me",isauthenticated,getmydetails);
router.get("/logout",isauthenticated,logout);






export default router;