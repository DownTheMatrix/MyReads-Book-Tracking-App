import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";

class SearchBooks extends Component {
  // Initial state
  state = {
    books: []
  }

    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                type="text" 
                placeholder="Search by title or author"
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks;