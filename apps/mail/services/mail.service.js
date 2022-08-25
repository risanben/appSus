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


const MAINKEY = 'mailsDB'
const TRASHKEY = 'trashDB'
const DRAFTKEY = 'draftDB'


function query(filterBy) {
    console.log('mailService-query-filterBy', filterBy);

    let mails = _loadFromStorage(MAINKEY)
    if (!mails) {
        mails = _createMails()
        _saveToStorage(MAINKEY, mails)
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

        if (isStared) {
            mails = mails.filter(mail => (
                mail.isStared === isStared
            ))
        } else if (status) {
            console.log('status', status);
            mails = mails.filter(mail => (
                mail.status === status
            ))
            if (status === 'trash') {
                mails = _loadFromStorage(TRASHKEY)
                console.log('else if (status)-trash', mails);
                if (mails) return Promise.resolve(mails)
            }
        }

        console.log(mails);
        if (mails) {
            mails = mails.filter(mail => (
                (mail.subject.includes(subject) ||
                    mail.body.includes(subject))
            ))
            console.log('query mails-', mails);
            return Promise.resolve(mails)
        } else {
            return Promise.reject('No search results were found')
        }

    }
    console.log('query mails-', mails);
    return Promise.resolve(mails)
}

function remove(mailId) {
    let mails = _loadFromStorage(MAINKEY)
    let removedMail = mails.filter(mail => mail.id === mailId)
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(MAINKEY, mails)
    /*-----------------------------------------------*/
    console.log(removedMail[0]);
    let removedMails = _loadFromStorage(TRASHKEY)
    if (!removedMails) removedMails = []
    removedMails.push(removedMail[0])
    _saveToStorage(TRASHKEY, removedMails)
    /*-----------------------------------------------*/
    return Promise.resolve()
}



function save(mail) {
    console.log('save(mail)', mail);
    if (mail.id) return update(mail)
    else return _add(mail)
}

function _add({ subject, body, date = new Date(), to, status }) {
    let mails = _loadFromStorage(MAINKEY)
    const mail = _createMail(subject, body, date, to, 'user@appsus.com', status)
    mails = [mail, ...mails]
    _saveToStorage(MAINKEY, mails)
    return Promise.resolve(mail)
}

function update(mailToUpdate) {
    let mails = _loadFromStorage(MAINKEY)
    mails = mails.map(mail => mail.id === mailToUpdate.id ? mailToUpdate : mail)

    console.log('service update-mails', mails);
    console.log('service update-mailToUpdate', mailToUpdate);
    _saveToStorage(MAINKEY, mails)
    return Promise.resolve(mailToUpdate)
}

function _createMail(subject = utilService.makeLorem(3), body = utilService.makeLorem(50), date = utilService.getRandomIntInclusive(13), to = getMailAdders(), from = getMailAdders(), status = (from === 'user@appsus.com' ? 'sent' : 'inbox')) {

    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: date,
        to,
        from,
        status
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