import React, { Component } from "react";
import ShelfUpdate from "./ShelfUpdate";

class Book extends Component {
  render() {
    const { book, books, arrangeShelf } = this.props;

    // add fallbacks for book cover images and book title
    const coverImg =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : "No book cover available";
    const title = book.title ? book.title : "No title available";

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{ backgroundImage: `url(${coverImg})` }}
            ></div>
            <ShelfUpdate
              book={book}
              books={books}
              arrangeShelf={arrangeShelf}
            />
          </div>
          <div className="book-title">{title}</div>
          {
            /* Assign an index as key to each book */
            book.authors &&
              book.authors.map((author, index) => (
                <div className="book-authors" key={index}>
                  {author}
                </div>
              ))
          }
        </div>
      </li>
    );
  }
}

export default Book;
