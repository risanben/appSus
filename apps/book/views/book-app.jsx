import { bookService } from '../services/book-service.js';
import { BookFilter } from '../cmps/book-filter.jsx';
import { BookList } from '../cmps/book-list.jsx';
import { BookDetails } from '../views/book-details.jsx';
import { BookAdd } from '../cmps/book-add.jsx';


const { Link } = ReactRouterDOM
export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
        selectedBook: null,
    }

    componentDidMount() {
        // console.log('mounted:')
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then((books) => this.setState({ books }))

    }


    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadBooks()
        })
    }

    addBookFromSearch = (book) => {
        bookService.save(book)
            .then(() => {
                this.loadBooks()
            })
    }

    onSelectBook = (bookId) => {
        bookService.getById(bookId)
            .then(book => this.setState({ selectedBook: book }))
    }

    onRemoveBook = (bookId) =>
        bookService.remove(bookId)
            .then(() => {
                console.log('car removed:')
                const books = this.state.books.filter(book => book.id !== bookId)
                this.setState({ books, selectedBook: null })
                
            })
            .catch(err => {
                console.log('Problem!!', err)
               
            })

    render() {

        const { books } = this.state
        return <section className="book-app">
            <BookFilter onSetFilter={this.onSetFilter} />
            <hr />
            <BookAdd addBookFromSearch={this.addBookFromSearch} />
            <hr />
            <BookList books={books} onSelectBook={this.onSelectBook} />
        </section>
    }
}