const {Link} = ReactRouterDOM

export function BookPreview({ book}) {
    // console.log('book:', book)

    function _getBookCurrency(currencyCode){
       switch (currencyCode) {
            case "ILS":
                return '₪';
            case "EUR":
                return '€';
            case "USD":
                return '$';
       }
    }

    return <Link to={`/book/${book.id}`} className="book-preview">
        <h3>{book.title}</h3>
        <h3>price : {book.listPrice.amount}{_getBookCurrency(book.listPrice.currencyCode)}</h3>
        <div className="img-container">
            <img src={book.thumbnail} />
        </div>
    </Link>

}