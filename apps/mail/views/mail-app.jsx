
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from "../cmps/mail-Filter.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"
import { MailEdit } from "./mail-edit.jsx"
import { mailService } from '../services/mail.service.js'

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

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
            .catch(err => {
                console.log('Problem!!', err)
                showErrorMsg('No search results were found')
            })
    }

    onSetFilter = (filterBy) => {
        console.log('filterBy-mail APP', filterBy);
        this.setState({ filterBy }, this.loadMails)
    }

    onRemoveMail = (mailId) => {
        mailService.remove(mailId)
            .then(() => {
                console.log('Removed!')
                const mails = this.state.mails.filter(mail => mail.id !== mailId)
                this.setState({ mails })
                showSuccessMsg('mail removed')
            })
            .catch(err => {
                console.log('Problem!!', err)
                showErrorMsg('Cannot remove mail')
            })
    }

    onStaredMail = (mailToUpdate) => {
        mailToUpdate.isStared = !mailToUpdate.isStared
        console.log('onStaredMail-mail', mailToUpdate);
        mailService.update(mailToUpdate)
            .then(() => {
                console.log('update')
                const mails = this.state.mails.map(mail => mail.id === mailToUpdate.id ? mailToUpdate : mail)
                this.setState({ mails })
                // showSuccessMsg('mail update')
            })
    }

    render() {
        const { mails } = this.state
        const { onSetFilter, onRemoveMail, onStaredMail } = this
        return <div className="mail-app">
            <MailHeader />
            <MailFilter onSetFilter={onSetFilter} />
            <MailList mails={mails} onRemoveMail={onRemoveMail} onStaredMail={onStaredMail} />
            {/* <MailEdit /> */}
        </div>
    }
}