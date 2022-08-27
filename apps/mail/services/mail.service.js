import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    getById,
    save,
    remove,
    update,
    readOrUnread,
    unReadCounter

}

// const mail = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt : 1551133930594,
//     to: 'momo@momo.com'
//     from:.....
//     status: 'inbox/sent/trash/draft'
// formatDate:,,
//
// }

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search 
    isRead: true, // (optional property, if missing: show all) 
    isStared: true, // (optional property, if missing: show all) 
    lables: ['important', 'romantic'] // has any of the labels 
}


const MAINKEY = 'mailsDB'
const TRASHKEY = 'trashDB'
const DRAFTKEY = 'draftDB'


function query(filterBy) {
    let mails = _loadFromStorage(MAINKEY)
    if (!mails) {
        mails = _createMails()
        _saveToStorage(MAINKEY, mails)
    }
    if (filterBy) {
        let { subject, status, isRead, isStared } = filterBy

        if (isStared) {
            mails = mails.filter(mail => (
                mail.isStared === isStared
            ))
        } else if (status) {
            mails = mails.filter(mail => (
                mail.status === status
            ))
            // if (status === 'trash') {
            //     mails = _loadFromStorage(TRASHKEY)
            //     if (mails) return Promise.resolve(mails)
            // }
        }

        if (mails) {
            mails = mails.filter(mail => (
                (mail.subject.includes(subject) ||
                    mail.body.includes(subject))
            ))

            return Promise.resolve(mails)
        } else {
            return Promise.reject('No search results were found')
        }

    }
    return Promise.resolve(mails)
}

function unReadCounter(mails) {
    let counter = 0
    mails.forEach(mail => {
        if (mail.status === 'inbox' && !mail.isRead) counter++
    })
    return counter
}

function readOrUnread(isRead) {
    let mails = _loadFromStorage(MAINKEY)
    console.log('isRead', isRead);
    console.log('mails', mails);

    if (!mails) return Promise.reject('No search results were found')
    mails = mails.filter(mail => (
        mail.isStared === isRead
    ))
    return Promise.resolve(mails)
}

function remove(mailId) {
    let mails = _loadFromStorage(MAINKEY)
    // let removedMail = mails.filter(mail => mail.id === mailId)
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(MAINKEY, mails)
    /*-----------------------------------------------*/
    // let removedMails = _loadFromStorage(TRASHKEY)
    // if (!removedMails) removedMails = []
    // removedMails.push(removedMail[0])
    // _saveToStorage(TRASHKEY, removedMails)
    /*-----------------------------------------------*/
    return Promise.resolve()
}



function save(mail) {
    if (mail.id) return update(mail)
    else return _add(mail)
}

function _add({ subject, body, date = new Date(), to, status }) {
    let mails = _loadFromStorage(MAINKEY)
    let fDate = formatDate(date)
    const mail = _createMail(subject, body, date, to, 'user@appsus.com', status, fDate)
    mails = [mail, ...mails]
    _saveToStorage(MAINKEY, mails)
    return Promise.resolve(mail)
}

function formatDate(date) {
    let monthName = utilService.getMonthName(date).substring(0, 3)
    let dayInMonth = date.getDate()
    let fDate = `${monthName} ${dayInMonth}`
    return fDate
}

function update(mailToUpdate) {
    let mails = _loadFromStorage(MAINKEY)
    mails = mails.map(mail => mail.id === mailToUpdate.id ? mailToUpdate : mail)
    _saveToStorage(MAINKEY, mails)
    return Promise.resolve(mailToUpdate)
}

function _createMail(subject = utilService.makeLorem(3), body = utilService.makeLorem(50), date = utilService.getRandomIntInclusive(13), to = getMailAdders(), from = getMailAdders(), status = (from === 'user@appsus.com' ? 'sent' : 'inbox'), fDate) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: date,
        to,
        from,
        status,
        fDate,
    }
}

function getMailAdders() {
    const rand = Math.random() >= 0.5 ?
        'user@appsus.com'
        : `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`
}

function _createMails() {
    const mails = []
    for (let i = 0; i < 50; i++) {
        mails.push(_createMail())
    }
    return mails
}

function getById(mailId) {
    if (!mailId) return Promise.resolve(null)
    const mails = _loadFromStorage(MAINKEY)
    const mail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
}

function _saveToStorage(key, mails) {
    storageService.saveToStorage(key, mails)
}

function _loadFromStorage(key) {
    return storageService.loadFromStorage(key)
}