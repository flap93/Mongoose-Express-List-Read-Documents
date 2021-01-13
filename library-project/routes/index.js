const express = require('express');
const router  = express.Router();
const Book = require('../models/Book.model.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books', (req, res, next) => {
  Book.find()
    .then(allTheBooksFromDB => {
      // console.log('Retrieved books from DB:', allTheBooksFromDB);
      res.render('books-list', { books: allTheBooksFromDB }); // pass `allTheBooksFromDB` to the view (as `books`)
    })
    .catch(error => console.log('Error while getting the books from the DB: ', error));
});
  
router.get('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
 
  Book.findOne({bookId})
    .then(theBook => res.render('book-details', { book: theBook }))
    .catch(error => console.log('Error while retrieving book details: ', error));
});



module.exports = router;
