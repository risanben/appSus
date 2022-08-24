import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    getById,

}

// const mail = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt : 1551133930594,
//     to: 'momo@momo.com'
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
        let { subject, status, isRead } = filterBy

        console.log('query-filterBy isRead', isRead);
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

function _createMail() {
    const rand = Math.random() >= 0.5 ? 1 : 0
    return {
        id: utilService.makeId(),
        subject: utilService.makeLorem(3),
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: utilService.getRandomIntInclusive(13),
        to: rand === 1 ?
            'user@appsus.com'
            : `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`,
        from: rand === 1 ?
            `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`
            : 'user@appsus.com',
        status: rand === 1 ? 'inbox' : 'sent'
    }
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