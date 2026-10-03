const express=require("express");
const axios=require("axios");
const books=require("../data/books");
const router=express.Router();
router.get("/",(req,res)=>res.json(books));
router.get("/isbn/:isbn",(req,res)=>{
 const b=books.find(x=>x.isbn.toLowerCase()===req.params.isbn.toLowerCase());
 return b?res.json(b):res.status(404).json({message:"Book not found"});
});
router.get("/author/:author",(req,res)=>{
 const q=req.params.author.toLowerCase();
 res.json(books.filter(b=>b.author.toLowerCase().includes(q)));
});
router.get("/title/:title",(req,res)=>{
 const q=req.params.title.toLowerCase();
 res.json(books.filter(b=>b.title.toLowerCase().includes(q)));
});
router.get("/:isbn/review",(req,res)=>{
 const b=books.find(x=>x.isbn.toLowerCase()===req.params.isbn.toLowerCase());
 return b?res.json(b.reviews):res.status(404).json({message:"Book not found"});
});
// Axios examples for the required async/await and promise-callback approaches.
async function getAllBooks(url="http://localhost:5000/books"){return (await axios.get(url)).data;}
function getBooksByAuthor(author,url="http://localhost:5000/books"){return axios.get(`${url}/author/${encodeURIComponent(author)}`).then(r=>r.data);}
function getBooksByTitle(title,url="http://localhost:5000/books"){return axios.get(`${url}/title/${encodeURIComponent(title)}`).then(r=>r.data);}
function getBookByISBN(isbn,url="http://localhost:5000/books"){return axios.get(`${url}/isbn/${encodeURIComponent(isbn)}`).then(r=>r.data);}
module.exports=router;
module.exports.getAllBooks=getAllBooks;
module.exports.getBooksByAuthor=getBooksByAuthor;
module.exports.getBooksByTitle=getBooksByTitle;
module.exports.getBookByISBN=getBookByISBN;
