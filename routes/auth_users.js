const express=require("express");
const bcrypt=require("bcryptjs");
const router=express.Router();
const users=new Map();
router.post("/register",async(req,res)=>{
 const {username,password}=req.body||{};
 if(!username||!password)return res.status(400).json({message:"username and password are required"});
 if(users.has(username))return res.status(409).json({message:"User already exists"});
 users.set(username,await bcrypt.hash(password,10));
 res.status(201).json({message:"User successfully registered. Now you can login."});
});
router.post("/login",async(req,res)=>{
 const {username,password}=req.body||{};
 const hash=users.get(username);
 if(!hash||!(await bcrypt.compare(password||"",hash)))return res.status(401).json({message:"Invalid username or password"});
 req.session.username=username;
 res.json({message:"Login successful",username});
});
router.post("/logout",(req,res)=>req.session.destroy(()=>res.json({message:"Logged out successfully"})));
module.exports=router;
