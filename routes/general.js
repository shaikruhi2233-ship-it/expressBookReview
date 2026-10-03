
const express = require("express");
const axios = require("axios");
const books = require("../data/books");

const router = express.Router();

const BASE_URL = "http://localhost:5000/books";

// Get all books using async/await
async function getAllBooks() {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Get book by ISBN using promise callback
function getBookByISBN(isbn) {
    return axios.get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error.message);
            throw error;
        });
}

// Get books by author using promise callback
function getBooksByAuthor(author) {
    return axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error.message);
            throw error;
        });
}

// Get books by title using async/await
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(
            `${BASE_URL}/title/${encodeURIComponent(title)}`
        );
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Express routes
router.get("/", (req, res) => {
    res.json(books);
});

router.get("/isbn/:isbn", (req, res) => {
    const book = books.find(
        item => item.isbn.toLowerCase() === req.params.isbn.toLowerCase()
    );
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});

router.get("/author/:author", (req, res) => {
    const author = req.params.author.toLowerCase();
    const result = books.filter(
        book => book.author.toLowerCase().includes(author)
    );
    res.json(result);
});

router.get("/title/:title", (req, res) => {
    const title = req.params.title.toLowerCase();
    const result = books.filter(
        book => book.title.toLowerCase().includes(title)
    );
    res.json(result);
});

router.get("/:isbn/review", (req, res) => {
    const book = books.find(
        item => item.isbn.toLowerCase() === req.params.isbn.toLowerCase()
    );
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book.reviews);
});

module.exports = router;
module.exports.getAllBooks = getAllBooks;
module.exports.getBookByISBN = getBookByISBN;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByTitle = getBooksByTitle;