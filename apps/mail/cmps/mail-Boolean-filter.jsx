export class MailBooleanFilter extends React.Component {
    state = {
        filterBy: {
            isRead: false,
            isStared: false,
        },
    }

    componentDidMount() {
        console.log('MailBooleanFilter- componentDidMount');
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value === 'true' ? false : true

        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onreadOrUnread(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onreadOrUnread(this.state.filterBy)
    }

    render() {
        const { isRead, isStared } = this.state.filterBy
        return <section className={'mail-boolean-filter'}>
            <form onSubmit={this.onFilter}>
                {/*
                <div><button
                    className="filter-btn"
                    id="by-star"
                    name="isStared"
                    value={isStared}
                    onClick={this.handleChange}
                ><img className="filter-icon" src="assets/img/icons/star3.png" />Stared</button></div>
            */}
                <div><button
                    className="filter-btn"
                    id="by-UnRead"
                    name="isRead"
                    value={isRead}
                    onClick={this.handleChange}
                > Read/UnRead</button></div>

            </form>

        </section>
    }
}