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
        if (field === 'isRead' || field === 'isStared' || field === 'isFiltered') {
            value = target.value === 'true' ? false : true
        } else {
            value = target.value
        }

        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value,
                isRead: false,
                isStared: false,
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
                status: 'inbox',
                isRead: false,
                isStared: false,
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        const { subject, status, isRead, isStared } = this.state.filterBy
        const { sideOrUp, unReadCount } = this.props
        let sideDisplay = sideOrUp === 'side' ? true : false
        return <section className={sideDisplay ? 'mail-filter' : 'up-filter'}>
            <form onSubmit={this.onFilter}>
                {!sideDisplay && <label htmlFor="by-subject">
                    <input
                        className={"by-subject"}
                        type="text"
                        placeholder=" Search in mails..."
                        id="by-subject"
                        name="subject"
                        value={subject}
                        onChange={this.handleChange}
                    /></label>}
                {sideDisplay && <React.Fragment>
                    <div> <button
                        className="filter-btn"
                        id="by-clean-filter"
                        name="status"
                        value={''}
                        onClick={this.cleanFilter}
                    > Show all </button></div>

                    <div> <button
                        className="filter-btn inbox"
                        id="by-inbox"
                        name="status"
                        value={'inbox'}
                        onClick={this.handleChange}
                    > <img className="filter-icon" src="assets/img/icons/inbox.png" />
                        Inbox <span className={"unReadCount"}>{unReadCount}</span></button></div>

                    <div><button
                        className="filter-btn"
                        id="by-sent"
                        name="status"
                        value={'sent'}
                        onClick={this.handleChange}
                    > <img className="filter-icon" src="assets/img/icons/sent-email.png" />Sent</button></div>

                    <div><button
                        className="filter-btn"
                        id="by-trash"
                        name="status"
                        value={'trash'}
                        onClick={this.handleChange}
                    > <img className="filter-icon" src="assets/img/icons/trash.png" />trash</button></div>

                    <div><button
                        className="filter-btn"
                        id="by-draft"
                        name="status"
                        value={'draft'}
                        onClick={this.handleChange}
                    > <img className="filter-icon" src="assets/img/icons/draft.jpg" />draft</button></div>

                </React.Fragment>}
            </form>
        </section>
    }
}