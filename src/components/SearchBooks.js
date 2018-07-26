import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../utils/BooksAPI";

class SearchBooks extends Component {
    state = {
    query: '',
    newBooks: [],
  }

  retrieveBooks = (event) => {

    const query = event.target.value.trim(); // get rid of spaces in the query
    this.setState({ query: query }); // merge state

    // detect user input in search field (20 is the max amount of books displayed)
    if ( query ) {
        BooksAPI.search( query, 20 ).then(( books ) => {
          books.length > 0 ? this.setState({ newBooks: books }) : this.setState({ newBooks: [] })
      })} else {
          this.setState({ newBooks: [] });
        } 
      }

  render() {

    const { query, newBooks } = this.state;
    const { books, arrangeShelf } = this.props;

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                placeholder="Search by title or author"
                value={ query }
                onChange={ this.retrieveBooks } />
            </div>
          </div>
          <div className="search-books-results">
            { newBooks.length > 0 && (
              <div>
                <div className=''>
                  <h3>Your query returned a total of { newBooks.length } books</h3>
                </div>
                <ol className="books-grid">
                  {newBooks.map(( book ) => (
                    <Book
                      book={ book }
                      books={ books }
                      key={ book.id }
                      arrangeShelf={ arrangeShelf }
                    />
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
}
export default SearchBooks;