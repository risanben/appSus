
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from "../cmps/mail-Filter.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"
import { MailEdit } from "./mail-edit.jsx"
import { mailService, gUnReadCounter } from '../services/mail.service.js'

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailBooleanFilter } from '../cmps/mail-Boolean-filter.jsx'
import { MailDetails } from './mail-details.jsx'

export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: {
            subject: '',
            status: 'inbox',
            isRead: false,
            isStared: false,
            isFiltered: false,
            // showListOrDetails: false,
        },
        // isOpenEditWindow: false,
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.query(this.state.filterBy)
            .then(mails => {
                this.setState({ mails })

            })
            .catch(err => {
                showErrorMsg('No search results were found')
            })
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy);
        this.setState({ filterBy }, this.loadMails)
    }

    // onreadOrUnread = ({ isRead }) => {
    //     console.log('isRead',isRead);
    //     mailService.readOrUnread(this.state.mails, isRead)
    //         .then(mails => {
    //             console.log(mails)
    //             this.setState({ mails })
    //         })
    //         .catch(err => {
    //             showErrorMsg('No search results were found')
    //         })
    // }

    onRemoveMail = (mailId) => {
        mailService.remove(mailId)
            .then(() => {
                const mails = this.state.mails.filter(mail => mail.id !== mailId)
                this.setState({ mails })
                showSuccessMsg('Email is permanently deleted')
            })
            .catch(err => {
                showErrorMsg('Cannot remove mail')
            })
    }

    onTrashMail = (mailToUpdate) => {
        // debugger
        mailToUpdate.status = 'trash'
        mailService.update(mailToUpdate)
            .then(() => {
                const mails = this.state.mails.map(mail => mail.id === mailToUpdate.id ? mailToUpdate : mail)
                this.setState({ mails })
                showSuccessMsg('Mail move to trash')
            })
            .catch(err => {
                showErrorMsg('Cannot move mail')
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

    // ----------------------------------------------
    // onListClick = () => {
    //     isShown = !this.State.showListOrDetails

    //     this.setState(() => ({
    //         showListOrDetails: isShown
    //     }))
    // }

    // ----------------------------------------------


    render() {
        const { mails } = this.state
        // if (!gUnReadCounter) gUnReadCounter = 0
        const unReadCount = gUnReadCounter
        const len = mails.length
        const { onSetFilter, onRemoveMail, onStaredMail, onFilterChange, onNewMail, onTrashMail, onreadOrUnread } = this
        return <div className="mail-app">
            <MailHeader numOfMailToDisplay={len} onSetFilter={onSetFilter} onNewMail={onNewMail} />
            <MailFilter onSetFilter={onSetFilter} sideOrUp={'side'} unReadCount={unReadCount} />
            <MailList mails={mails} onTrashMail={onTrashMail} onStaredMail={onStaredMail} onRemoveMail={onRemoveMail} /* onSetFilter={onSetFilter} sideOrUp={'side'} unReadCount={unReadCount}*/ />
    
            {/* <MailBooleanFilter onSetFilter={onSetFilter} /> */}
        </div>
    }
}