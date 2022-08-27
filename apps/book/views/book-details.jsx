import { bookService } from "../services/book-service.js"
import { ReviewAdd } from "../cmps/review-add.jsx"
import { utilService } from "../services/util.service.js"

const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {


    state = {
        book: null,
        isReviewOpen: false
    }

    componentDidMount() {
        // setTimeout(() => {
        this.loadBook()
        // }, 2000)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getById(bookId)
            .then((book) => {
                if (!book) return this.onGoBack()
                this.setState({ book })
            })
    }

    onRemoveBook = () => {
        const { book } = this.state
        bookService.remove(book.id)
            .then(this.onGoBack)
    }

    onGoBack = () => {
        this.props.history.push('/book')
    }

    onOpenReview = () => {
       this.setState({isReviewOpen: true})
    }

    _getReadingLength = (num) => {
        if (num < 100) return 'Light Reading'
        if (num < 500 && num > 200) return 'Decent Reading'
        if (num > 500) return 'Long Reading'
    }

    _getBookAncienity = (year) => {
        const currYear = new Date().getFullYear()
        let bookAge = currYear - year

        if (bookAge > 10) return 'Veteran Book'
        if (bookAge < 1) return 'New Book'
    }

    _getClassByPrice = (price) => {
        if (price > 150) return 'book-details red'
        if (price < 20) return 'book-details green'
        return 'book-details'
    }

    _saleSign = (boolean) => {
        return boolean ? 'ON SALE NOW!' : ""
    }

    onCloseModal=()=>{
        this.setState({isReviewOpen: false})
    }

    onAddReview = (review) => {
        review.id = utilService.makeId()
        console.log('review:', review)
        const { book } = this.state
        book.reviews.unshift(review)
        bookService.addReview(book)
            .then(() => this.setState({ book }))
    }

    render() {
        const { book } = this.state
        if (!book) return <div>Loading...</div>
        const nextBookId = bookService.getNextBookId(book.id)
        const reviews = book.reviews

        return <section className={this._getClassByPrice(book.listPrice.amount)}>
            <h3>{book.title}</h3>
            <h3>{this._saleSign(book.listPrice.isOnSale)}</h3>
            <h5>{book.authors}</h5>
            <div className="img-container">
                <img src={book.thumbnail} />
            </div>
            <p>{book.description}</p>
            <p>{this._getBookAncienity(book.publishedDate)}</p>
            <p>{this._getReadingLength(book.pageCount)}</p>

            <button onClick={this.onGoBack}>Back</button>
            <button onClick={() => this.onRemoveBook(book.id)}>Remove This Book</button>
            <Link to={`/book/${nextBookId}`}><button >Next Book</button></Link>
            <Link to={`/book/edit/${book.id}`}><button >Edit Book</button></Link>
        </section>
    }

}