const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();


/**
 * Route: /books
 * Method: GET
 * Description: Fetch all the books
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res) => {
    res.status(200).json({
        success:true,
        message: "Fetched all the books",
        data: books,
    });
});


/**
 * Route: /books/issued
 * Method: GET
 * Description: Fetch all the issued books
 * Access: Public
 * Parameters: None
 */
router.get("/issued/by-user", (req, res) => {
    const usersWithIssuedBook = users.filter((each) => {
        if(each.issuedBook) 
            return each;
    });
    const issuedBooks = [];

    usersWithIssuedBook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "User has no books issued",
        });
    }
    return res.status(200).json({
        success: true,
        message: "User has issued books",
        data: issuedBooks,
    });
});


/**
 * Route: /books/:id
 * Method: GET
 * Description: Fetch books by their ID
 * Access: Public
 * Parameters: None
 */
router.get("/:id", (req, res) => {
    const {id} = req.params;
    const book = books.find((each) => each.id === id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not found",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Book ID Found",
        data: book,
    });
});


/**
 * Route: /
 * Method: POST
 * Description: Adding a New Book
 * Access: Public
 * Parameters: None
 * Data: ID, Name, Author, Genre, Price, Publisher
 */
router.post("/", (req, res) => {
    const {data} = req.body;
    if(!data){
        return res.status(404).json({
            success: false,
            message: "Invalid Data",
        });
    }
    const book = books.find((each) => each.id === data.id);
    if(book){
        return res.status(404).json({
            success: false,
            message: "ID already exists",
        });
    }
    const allBooks = {...books, data};
    return res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: allBooks,
    });
});


/**
 * Route: /:id
 * Method: PUT
 * Description: Updating a Book by ID
 * Access: Public
 * Parameters: ID
 * Data: ID, Name, Author, Genre, Price, Publisher
 */
router.put("/updateBook/:id", (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id); 

    if(!book){
        return res.status(404).json({
            status: false,
            message: "Book Not Found",
        });
    }
    const updateData = books.map(each => {
        if(each.id === id) {
            return {...each, ...data};
        }
        return each;
    });
    return res.status(200).json({
        status: true,
        message: "Updated Book by ID",
        data: updateData,
    });
});


module.exports = router;