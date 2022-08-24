

export class MailFilter extends React.Component {
    state = {
        filterBy: {
            subject: '',
            status: '',
        },
    }

    componentDidMount() {
        console.log('MailFilter- componentDidMount');
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        console.log('handleChange- field, value', field, value);
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
        const { subject, status } = this.state.filterBy
        return <section className="mail-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-subject">mail search:</label>
                <input
                    type="text"
                    placeholder="by subject or mail body.."
                    id="by-subject"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                />

                <label htmlFor="by-inbox"></label>
                <button
                    id="by-inbox"
                    name="status"
                    value={'inbox'}
                    onClick={this.handleChange}
                > Inbox</button>

            </form>


        </section>
    }
}