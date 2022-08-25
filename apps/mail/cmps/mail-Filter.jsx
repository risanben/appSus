

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
        const { sideOrUp } = this.props
        let sideDisplay = sideOrUp === 'side' ? true : false
        console.log('sideOrUp', sideOrUp);
        return <section className={sideDisplay ? 'mail-filter' : 'up-filter'}>
            <form onSubmit={this.onFilter}>
                {!sideDisplay && <label htmlFor="by-subject">mail search:
                    <input
                        type="text"
                        placeholder="by subject or mail body.."
                        id="by-subject"
                        name="subject"
                        value={subject}
                        onChange={this.handleChange}
                    /></label>}
                {sideDisplay && <React.Fragment>

                    <div
                        className="filter-btn"
                        id="by-clean-filter"
                        name="status"
                        value={''}
                        onClick={this.cleanFilter}
                    > Show all</div>

                    {/* <label htmlFor="by-clean-filter">
                        <button
                            id="by-clean-filter"
                            name="status"
                            value={''}
                            onClick={this.cleanFilter}
                        > Show all</button></label> */}

                    <div
                        className="filter-btn"
                        id="by-inbox"
                        name="status"
                        value={'inbox'}
                        onClick={this.handleChange}
                    > Inbox</div>

                    <div
                        className="filter-btn"
                        id="by-sent"
                        name="status"
                        value={'sent'}
                        onClick={this.handleChange}
                    > Sent</div>

                    <div
                        className="filter-btn"
                        id="by-star"
                        name="isStared"
                        value={isStared}
                        onClick={this.handleChange}
                    >⭐ Stared</div>

                    <div
                        className="filter-btn"
                        id="by-trash"
                        name="status"
                        value={'trash'}
                        onClick={this.handleChange}
                    > <img className="filter-icon" src="assets/img/icons/trash.png" />trash</div>

                    <div
                        className="filter-btn"
                        id="by-draft"
                        name="status"
                        value={'draft'}
                        onClick={this.handleChange}
                    > draft</div>

                    <div
                        className="filter-btn"
                        id="by-UnRead"
                        name="isRead"
                        value={isRead}
                        onClick={this.handleChange}
                    > UnRead</div>
                </React.Fragment>}
            </form>


        </section>
    }
}