

export class MailFilter extends React.Component {
    state = {
        filterBy: {
            subject: '',
            status: '',
            isRead: false,
            isStared: false,
            isFiltered: false,
        },
    }

    componentDidMount() {
        console.log('MailFilter- componentDidMount');
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = ''
        console.log('target', target);
        // const value = target.name === 'isRead' ? +(target.value) : target.value
        // const value = target.value
        if (field === 'isRead' || field === 'isStared' || field === 'isFiltered') {
            value = target.value === 'true' ? false : true
            // } else if (field === 'isStared') {
            //     value = target.value === 'true' ? true : false
            //     console.log('value', value);
        } else {
            value = target.value
        }
        console.log('handleChange-target.field, target.value', field, value);

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

    cleanFilter = () => {
        this.setState(() => ({
            filterBy: {
                subject: '',
                status: '',
                isRead: false,
                isStared: false,
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        const { subject, status, isRead, isStared } = this.state.filterBy
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

                <label htmlFor="by-clean-filter"></label>
                <button
                    id="by-clean-filter"
                    name="status"
                    value={''}
                    onClick={this.cleanFilter}
                > Show all</button>

                <label htmlFor="by-inbox"></label>
                <button
                    id="by-inbox"
                    name="status"
                    value={'inbox'}
                    onClick={this.handleChange}
                > Inbox</button>

                <label htmlFor="by-sent"></label>
                <button
                    id="by-sent"
                    name="status"
                    value={'sent'}
                    onClick={this.handleChange}
                > Sent</button>

                <label htmlFor="by-star"></label>
                <button
                    id="by-star"
                    name="isStared"
                    value={isStared}
                    onClick={this.handleChange}
                > Stared ⭐</button>

                <label htmlFor="by-trash"></label>
                <button
                    id="by-trash"
                    name="status"
                    value={'trash'}
                    onClick={this.handleChange}
                > trash</button>

                <label htmlFor="by-draft"></label>
                <button
                    id="by-draft"
                    name="status"
                    value={'draft'}
                    onClick={this.handleChange}
                > draft</button>

                <label htmlFor="by-UnRead"></label>
                <button
                    id="by-UnRead"
                    name="isRead"
                    value={isRead}
                    onClick={this.handleChange}
                > UnRead</button>

            </form>


        </section>
    }
}