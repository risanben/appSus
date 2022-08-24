
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from "../cmps/mail-Filter.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"
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
            <MailHeader />
            <MailFilter onSetFilter={this.onSetFilter} />
            <MailList mails={mails} />
            <MailEdit />
        </div>
    }
}