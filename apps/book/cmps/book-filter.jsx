
export class BookFilter extends React.Component {

    state = {
        filterBy: {
            title: '',
            maxPrice: '',
            minPrice: ''
        },
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }



    render() {
        const { title, minPrice, maxPrice } = this.state.filterBy
        return <section className="book-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-title">title :</label>
                <input
                    type="text"
                    placeholder="by title.."
                    id="by-title"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                />

                <label htmlFor="by-min-price">Min Price :</label>
                <input
                    type="number"
                    placeholder="by min price.."
                    id="by-min-price"
                    name="minPrice"
                    value={minPrice}
                    onChange={this.handleChange}
                />

                <label htmlFor="by-max-price">Max Price :</label>
                <input
                    type="number"
                    placeholder="by max price.."
                    id="by-max-price"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={this.handleChange}
                />

                <button>Filter!</button>

            </form>
        </section>
    }
}