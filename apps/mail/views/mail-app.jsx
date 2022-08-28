
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-Filter.jsx'
import { MailHeader } from '../cmps/mail-header.jsx'
import { MailEdit } from './mail-edit.jsx'
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
        },
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

    onNewMail = () => {
        this.setState({ isOpenEditWindow: true })
    }

    _onOpenFilters = () => {
        const elFilters = document.querySelector('.mail-filter')
        const elFilters1 = document.querySelector('.mail-boolean-filter')
        console.log('elFilters:', elFilters)
        if (elFilters.classList.contains('visible')) {
            elFilters.classList.remove('visible')
            elFilters1.classList.remove('visible')
        } else {
            elFilters.classList.add('visible')
            elFilters1.classList.add('visible')
        }
    }

    render() {
        const { mails } = this.state
        // if (!gUnReadCounter) gUnReadCounter = 0
        const unReadCount = gUnReadCounter
        const len = mails.length
        const { onSetFilter, onRemoveMail, onStaredMail, onFilterChange, onNewMail, onTrashMail, onreadOrUnread } = this
        return <div className="mail-app">
            <MailHeader numOfMailToDisplay={len} onSetFilter={onSetFilter} onNewMail={onNewMail} />
            <img onClick={this._onOpenFilters} className="mail-burger" src="assets/img/icons/menu-iconn.png" alt="" />
            <MailFilter onSetFilter={onSetFilter} sideOrUp={'side'} unReadCount={unReadCount} />
            <MailBooleanFilter onSetFilter={onSetFilter} />
            <MailList mails={mails} onTrashMail={onTrashMail} onStaredMail={onStaredMail} onRemoveMail={onRemoveMail} /* onSetFilter={onSetFilter} sideOrUp={'side'} unReadCount={unReadCount}*/ />

        </div>
    }
}