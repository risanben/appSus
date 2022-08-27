import { ReviewList } from './cmp/review-list.jsx'

export class ReviewAdd extends React.Component {

    state = {
        reviews: null,
        review: {
            'reviewer-name': 'anonymous',
            rate: 5,
            readAt: new Date(),
            text: ''
        }
    }

    componentDidMount() {
        this.setState({ reviews: this.props.reviews })
    }

    handleChange = ({ target }) => {
        console.log('target.value:', target.value)
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            review: { ...prevState.review, [field]: value }
        }))
    }

    onSaveReview = (ev) => {
        ev.preventDefault()
        // bookService.saveReview(this.state.review,this.props.book)
        this.props.onAddReview(this.state.review)
    }

    render() {
        const { reviewerName, rate, readAt, text } = this.state.review
        const reviews = this.props.reviews
    
        return <section className="review-add">
            <form className="flex column align-center" onSubmit={this.onSaveReview}>

                <label htmlFor="reviewer-name">your name</label>
                <input type="text" name="reviewer-name"
                    value={reviewerName} id="reviewer-name"
                    onChange={this.handleChange}
                    required
                />

                <label htmlFor="rate">rate</label>
                <select name="rate" value={rate} onChange={this.handleChange} id="rate" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <label htmlFor="text">comments</label>
                <input type="text" name="text"
                    value={text} id="text"
                    onChange={this.handleChange}
                />
                <button>Save review</button>
            </form>
            <button onClick={this.props.onCloseModal}>close</button>
            {reviews && <ReviewList reviews={reviews} />}
        </section>
    }
}