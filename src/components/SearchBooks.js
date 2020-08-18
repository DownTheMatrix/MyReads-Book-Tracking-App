import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../utils/BooksAPI";

class SearchBooks extends Component {
  state = {
    query: "",
    newBooks: [],
    queryError: false,
  };

  retrieveBooks = (event) => {
    const query = event.target.value.trim(); // get rid of spaces in the query
    this.setState({ query: query }); // merge state
    // detect user input in search field (20 is the max amount of books displayed)
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        if (query === this.state.query) {
          return books.length > 0
            ? this.setState({ newBooks: books, queryError: false })
            : this.setState({ newBooks: [], queryError: true });
        }
      });
    } else {
      this.setState({ newBooks: [], queryError: false });
    }
  };

  render() {
    const { query, newBooks, queryError } = this.state;
    const { books, arrangeShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.retrieveBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          {newBooks.length > 0 && (
            <div>
              <div className="">
                <h3>Your query returned a total of {newBooks.length} books</h3>
              </div>
              <ol className="books-grid">
                {newBooks.map((book) => (
                  <Book
                    book={book}
                    books={books}
                    key={book.id}
                    arrangeShelf={arrangeShelf}
                  />
                ))}
              </ol>
            </div>
          )}
          {queryError && (
            <div>
              <div className="">
                <h3>Books not found! Try with another keyword.</h3>{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
