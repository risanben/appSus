
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from "../cmps/mail-Filter.jsx"
import { MailEdit } from "./mail-edit.jsx"
import { mailService } from '../services/mail.service.js'

export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: null,
    }

    componentDidMount() {
        console.log('MailApp-componentDidMount');
        this.loadMails()
    }

    loadMails = () => {
        mailService.query(this.state.filterBy)
            .then(mails => this.setState({ mails }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
    }

    render() {
        const { mails } = this.state
        return <div className="mail-app">
            <MailFilter onSetFilter={this.onSetFilter} />
            <h1>hello from MailApp</h1>
            <MailList mails={mails} />
            <MailEdit />
        </div>
    }
}