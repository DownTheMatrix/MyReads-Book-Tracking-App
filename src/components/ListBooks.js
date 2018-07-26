import React, { Component } from "react";
import BookShelf from "./BookShelf";

class ListBooks extends Component {
    state = { 
        changedShelf: false // credit: my mentor, Lorena :)
    }
  
    render() {
      const { books, arrangeShelf } = this.props;
      // Define shelf categories
      const shelfCategories = [{ category: "currentlyReading", title: "Currently Reading "},
                               { category: "wantToRead",  title: "Want To Read" },
                               { category: "read", title: "Read"}];
  
    return (
        <div className="list-books-content">
        {/* Map over the shelf categories, use index as key and return the books details */}
          {shelfCategories.map(( shelf, index ) =>  {
            const shelfBooks = books.filter( book => book.shelf === shelf.category);
            return (
              <div className="bookshelf" key={ index }>
                <h2 className="bookshelf-title">{ shelf.title }</h2>
                <div className="bookshelf-books">
                  <BookShelf
                    books={ shelfBooks }
                    arrangeShelf={ arrangeShelf }
                  />
                </div>
              </div> )
          })}
        </div>
      )
    }
  }
  
  export default ListBooks;