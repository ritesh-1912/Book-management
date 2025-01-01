const { UserModel, BookModel } = require("../models/index");

const  getAllBooks = async(req, res) =>{
    const books = await BookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success: false,
            message: "Book Not Found",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Book Found",
        data: books,
    });
};

const getSingleBookById = async(req, res) => {
    const {id} = req.params;
    const book = await BookModel.findById(id);
        if (!book) {
          return res.status(404).json({
            success: false,
            message: "Book Not Found",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Book ID Found",
          data: book,
        });
};

const getIssuedBooks = async(req, res) => {
    const users = await UserModel.find({
        issuedBook: {$exists: true},
    }).populate("IssuedBook");

    const issuedBooks = users.map((each)=> new issuedBook(each))
  if (issuedBooks.length === 0) {
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
}
module.exports = {getAllBooks, getSingleBookById, getIssuedBooks};