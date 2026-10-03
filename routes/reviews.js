const express=require("express");
const books=require("../data/books");
const router=express.Router();
const findBook=id=>books.find(b=>b.isbn.toLowerCase()===String(id).toLowerCase());
function loggedIn(req,res,next){if(!req.session.username)return res.status(401).json({message:"Please login first"});next();}
router.put("/:isbn/review",loggedIn,(req,res)=>{
 const b=findBook(req.params.isbn);if(!b)return res.status(404).json({message:"Book not found"});
 const review=req.body&&req.body.review;if(typeof review!=="string"||!review.trim())return res.status(400).json({message:"A non-empty review is required"});
 b.reviews[req.session.username]=review.trim();
 res.json({message:"Review added/updated successfully",reviews:b.reviews});
});
router.delete("/:isbn/review",loggedIn,(req,res)=>{
 const b=findBook(req.params.isbn);if(!b)return res.status(404).json({message:"Book not found"});
 if(!Object.prototype.hasOwnProperty.call(b.reviews,req.session.username))return res.status(404).json({message:"Review not found for this user"});
 delete b.reviews[req.session.username];res.json({message:"Review deleted successfully",reviews:b.reviews});
});
module.exports=router;
