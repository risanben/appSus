import { bookAddService } from '../services/bookAdd.service.js';
import { bookService } from '../services/book-service.js';



export class BookAdd extends React.Component {


    state = {
        bookName: '',
        books: []
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ bookName: value }, () => { console.log('this.state:', this.state) })
    }

    onSearchBook = (ev) => {
        ev.preventDefault()
        const searchTerm = this.state.bookName
        bookAddService.getBooks(searchTerm)
            .then((res) => { this.setState({ books: res }) })
    }

    onAddBook = (book) => {
        let newBook = bookService.saveBookFromSearch(book)  
        this.props.addBookFromSearch(newBook)
    }
    render() {
        const { bookName } = this.state
        // console.log('this.state.books:', this.state.books)

        return <div className="book-add">
            <form>
                <label htmlFor="bookName">search book </label>
                <input
                    type="text"
                    placeholder="type book name.."
                    id="bookName"
                    name="bookName"
                    value={bookName}
                    onChange={this.handleChange} />

                <button onClick={this.onSearchBook}> search </button>
            </form>
            {this.state.books.length && <section className="search-results">
                <ul>
                    {this.state.books.map((book) => {
                        return <li key={book.id} className="flex space-between">
                            {book.volumeInfo.title}
                            <button onClick={() => { this.onAddBook(book)}}>+</button>
                        </li>
                    })}

                </ul>
            </section>}
        </div>
    }
}