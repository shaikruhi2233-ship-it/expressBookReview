# Express Book Review API

## Run locally
Install Node.js 18+, unzip this folder, open a terminal here, then run:
```bash
npm install
npm start
```
API base URL: `http://localhost:5000`

## Endpoints
- GET `/books` — all books
- GET `/books/isbn/:isbn` — ISBN lookup
- GET `/books/author/:author` — author search
- GET `/books/title/:title` — title search
- GET `/books/:isbn/review` — reviews
- POST `/auth/register` — JSON `{ "username":"ruhi", "password":"pass123" }`
- POST `/auth/login` — same JSON; saves a session cookie
- PUT `/books/:isbn/review` — logged-in user adds/updates JSON `{ "review":"Great book" }`
- DELETE `/books/:isbn/review` — removes the logged-in user's review

## cURL examples
```bash
curl http://localhost:5000/books
curl http://localhost:5000/books/isbn/9780451524935
curl http://localhost:5000/books/author/George%20Orwell
curl http://localhost:5000/books/title/gatsby
curl http://localhost:5000/books/9780451524935/review
curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d "{\"username\":\"ruhi\",\"password\":\"pass123\"}"
curl -i -c cookies.txt -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d "{\"username\":\"ruhi\",\"password\":\"pass123\"}"
curl -b cookies.txt -X PUT http://localhost:5000/books/9780451524935/review -H "Content-Type: application/json" -d "{\"review\":\"Excellent book\"}"
curl -b cookies.txt -X DELETE http://localhost:5000/books/9780451524935/review
```

**Important:** This is a runnable practice implementation with sample book data. For the graded Skills Network project, fork the official `ibm-developer-skills-network/expressBookReview` repository and use its provided JSON dataset and expected file structure. Transfer/adapt code into that fork and submit actual cURL outputs from your environment.
