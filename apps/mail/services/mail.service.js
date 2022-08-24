import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    getById,

}

const KEY = 'mailsDB'

function query(/*filterBy*/) {
    console.log('mailService-query');
    let mails = _loadFromStorage()
    console.log('mails', mails);
    if (!mails) {
        mails = _createMails()
        _saveToStorage(mails)
    }

    // if (filterBy) {
    //     let { vendor, minSpeed, maxSpeed } = filterBy
    //     if (!minSpeed) minSpeed = 0;
    //     if (!maxSpeed) maxSpeed = Infinity
    //     cars = cars.filter(car => (
    //         car.vendor.includes(vendor) &&
    //         car.speed >= minSpeed &&
    //         car.speed <= maxSpeed
    //     ))
    // }
    console.log('mails', mails);
    return Promise.resolve(mails)
}

function _createMail() {
    return {
        id: utilService.makeId(),
        subject: utilService.makeLorem(3),
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: utilService.getRandomIntInclusive(13),
        to: `${utilService.makeLorem(1)}${utilService.makeLorem(1)}.com`
    }
}

function _createMails() {
    console.log('_createMails');
    const mails = []
    for (let i = 0; i < 20; i++) {
        mails.push(_createMail())
    }
    return mails
}

// const mail = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt : 1551133930594,
//     to: 'momo@momo.com'
// }

function getById(mailId) {
    console.log('getById-mailId', mailId);
    if (!mailId) return Promise.resolve(null)
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    console.log('getById-mail', mail);
    return Promise.resolve(mail)
}

function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}