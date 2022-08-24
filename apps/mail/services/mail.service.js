import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    getById,
    save,
    remove,
    update,

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


const KEY = 'mailsDB'

function query(filterBy) {
    console.log('mailService-query-filterBy', filterBy);

    let mails = _loadFromStorage()
    if (!mails) {
        mails = _createMails()
        _saveToStorage(mails)
    }

    // if (filterBy) {
    //     let { subject, status } = filterBy
    //     console.log('query-filterBy status', status);
    //     mails = mails.filter(mail => (
    //         (mail.subject.includes(subject) ||
    //             mail.body.includes(subject))
    //         // mail.status === status
    //     ))
    // }/*-------------------------------------------*/
    if (filterBy) {
        let { subject, status, isRead, isStared } = filterBy

        console.log('query-filterBy isStared', isStared);
        console.log('mails', mails);
        // mails = mails.filter(mail => (
        //     mail.isStared === isStared
        // ))
        mails = mails.filter(mail => (
            mail.status === status &&
            mail.isRead === isRead
        ))
        mails = mails.filter(mail => (
            (mail.subject.includes(subject) ||
                mail.body.includes(subject))
        ))

    }
    // }/*-------------------------------------------*/

    return Promise.resolve(mails)
}

function remove(mailId) {
    let mails = _loadFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(mails)
    return Promise.resolve()
}

function save(mail) {
    if (mail.id) return update(mail)
    else return _add(mail)
}

function _add({ subject, body, date = new Date(), to }) {
    let mails = _loadFromStorage()
    const mail = _createMail(subject, body, date, to, 'user@appsus.com')
    mails = [mail, ...mails]
    _saveToStorage(mails)
    return Promise.resolve(mail)
}

function update(mailToUpdate) {
    let mails = _loadFromStorage()
    mails = mails.map(mail => mail.id === mailToUpdate.id ? mailToUpdate : mail)

    console.log('service update-mails', mails);
    console.log('service update-mailToUpdate', mailToUpdate);
    _saveToStorage(mails)
    return Promise.resolve(mailToUpdate)
}

function _createMail(subject = utilService.makeLorem(3), body = utilService.makeLorem(50), date = utilService.getRandomIntInclusive(13), to = getMailAdders(), from = getMailAdders()) {

    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: date,
        to,
        from,
        status: from === 'user@appsus.com' ? 'sent' : 'inbox'
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
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
}

function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}