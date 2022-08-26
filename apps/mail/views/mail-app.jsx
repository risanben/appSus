
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
        // isOpenEditWindow: false,
    }

    componentDidMount() {
        console.log('MailApp-componentDidMount');
        this.loadMails()
    }

    loadMails = () => {
        mailService.query(this.state.filterBy)
            .then(mails => {
                console.log(mails)
                this.setState({ mails })
            })
            .catch(err => {
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
                const mails = this.state.mails.filter(mail => mail.id !== mailId)
                this.setState({ mails })
                showSuccessMsg('mail removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove mail')
            })
    }

    onStaredMail = (mailToUpdate) => {
        mailToUpdate.isStared = !mailToUpdate.isStared
        mailService.update(mailToUpdate)
            .then(() => {
                const mails = this.state.mails.map(mail => mail.id === mailToUpdate.id ? mailToUpdate : mail)
                this.setState({ mails })
            })
    }

    // onFilterChange = (filterBy) => {
    //     this.setState({ filterBy }, this.loadMails)
    // }


    onNewMail = () => {
        this.setState({ isOpenEditWindow: true })
    }

    render() {
        const { mails } = this.state
        const len = mails.length
        const { onSetFilter, onRemoveMail, onStaredMail, onFilterChange, onNewMail } = this
        return <div className="mail-app">
            <MailHeader numOfMailToDisplay={len} onSetFilter={onSetFilter} onNewMail={onNewMail} />
            <MailFilter onSetFilter={onSetFilter} sideOrUp={'side'} /*onFilterChange={onFilterChange}*/ />
            <MailList mails={mails} onRemoveMail={onRemoveMail} onStaredMail={onStaredMail} />
            {/* {this.state.isOpenEditWindow && <MailEdit mail={} />} */}
        </div>
    }
}