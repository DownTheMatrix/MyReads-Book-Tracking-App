import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./utils/BooksAPI";
import "./App.css";
import SearchBooks from "./components/SearchBooks";
import ListBooks from "./components/ListBooks";

class BooksApp extends Component {
    // Set initial state
    state = {
    books: []
  };

  /* Returns a Promise which resolves to a JSON object containing a collection of book objects.
  This collection represents the books currently in the bookshelves in your app. */
  retrieveBooksInfo = () => {
    BooksAPI.getAll().then( books => {
      this.setState({ books });
    })
  }

  // This hook runs after the component output has been rendered to the DOM (https://reactjs.org/docs/state-and-lifecycle.html)
  componentDidMount() {
    this.retrieveBooksInfo();
  }

  // Todo: implement a notification system to tell the user the book has been moved to the corresponding shelf
  alertChange = () => {
    alert("book successfully moved to the chosen shelf: " /* + current shelf */);
  }

  arrangeShelf = ( newBook, newShelf ) => {
    BooksAPI.update( newBook, newShelf ).then(( response ) => {
      // Notify the user about the shelf change
      this.alertChange();
      // Arrange the shelf
      newBook.shelf = newShelf;
      // Sort the books
      const updatedBooks = this.state.books.filter( book => book.id !== newBook.id );
      // Push the new books into the array, and then merge the state
      updatedBooks.push( newBook )
      this.setState({ books: updatedBooks });
    })
  }

  render() {
    const { books } = this.state;
    return (
        <div className="app">
        {/* Routing */}
          <Route path="/search" render={( { history }) => (
            <SearchBooks
              books={ books }
              arrangeShelf={ this.arrangeShelf }
            />
          )} />
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <ListBooks
                books={ books }
                arrangeShelf={ this.arrangeShelf }
              />
              <div className="open-search">
                <Link to="/search">Search</Link>
              </div>
            </div>
          )} />
        </div>
      )
    }
  }
  
export default BooksApp;
