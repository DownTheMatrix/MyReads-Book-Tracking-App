import React, { Component } from "react";

class ShelfUpdate extends Component {
  render() {
    const { book, books, arrangeShelf } = this.props;
    // Set current shelf to none
    let currentShelf = "none";
    // If a book is found, place it inside of current shelf
    for ( let item of books ) {
      if ( item.id === book.id )  {
        currentShelf = item.shelf;
      }
    }

    return (
      <div className="book-shelf-changer">
        <select onChange={( event ) => arrangeShelf(book, event.target.value )}
          defaultValue={ currentShelf }>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfUpdate;