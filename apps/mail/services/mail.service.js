import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    getById,
    save,
    remove,
    update,
    readOrUnread,
    unReadCounter,

}

const MAINKEY = 'mailsDB'
export var gUnReadCounter

function query(filterBy) {
    let mails = _loadFromStorage(MAINKEY)
    if (!mails) {
        // mails = _createMails()
        mails = gMails
        _saveToStorage(MAINKEY, mails)
    }

    console.log('mails', mails);
    unReadCounter(mails)
    if (filterBy) {
        let { subject, status, isRead, isStared } = filterBy
        // debugger
        if (isStared) {
            mails = mails.filter(mail => (
                mail.isStared === isStared
            ))
            console.log('mails', mails);
        }//if (isStared) 
        if (isRead) {
            mails = mails.filter(mail => (
                mail.isRead === isRead
            ))
            console.log('mails', mails);
        }//if (isRead)
        if (status) {
            mails = mails.filter(mail => (
                mail.status === status
            ))
        }//if (status)
        console.log('mails', mails);
        if (subject) {
            mails = mails.filter(mail => (
                (mail.subject.toLowerCase().includes(subject.toLowerCase()) ||
                    mail.body.toLowerCase().includes(subject.toLowerCase()))
            ))
            console.log(mails);

        }//if (subject)
    }//if (filterBy)
    if (mails) {

        return Promise.resolve(mails)
    } else {
        return Promise.reject('No search results were found')
    }
}

function unReadCounter(mails) {
    gUnReadCounter = 0
    if (!mails) return gUnReadCounter
    mails.forEach(mail => {
        if (mail.status === 'inbox' && !mail.isRead) gUnReadCounter++
    })
    return gUnReadCounter
}

function readOrUnread(isRead) {
    let mails = _loadFromStorage(MAINKEY)
    if (!mails) return Promise.reject('No search results were found')
    mails = mails.filter(mail => (
        mail.isStared === isRead
    ))
    return Promise.resolve(mails)
}

function remove(mailId) {
    let mails = _loadFromStorage(MAINKEY)
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(MAINKEY, mails)
    return Promise.resolve()
}



function save(mail) {
    if (mail.id) return update(mail)
    else return _add(mail)
}

function _add({ subject, body, date = new Date(), to, status }) {
    console.log(status);
    let mails = _loadFromStorage(MAINKEY)
    let fDate = formatDate(date)
    const mail = _createMail(subject, body, date, to, 'user@appsus.com', 'Me', status, fDate)
    mails = [mail, ...mails]
    _saveToStorage(MAINKEY, mails)
    console.log(mail);
    return Promise.resolve(mail)
}

function formatDate(date) {
    let monthName = utilService.getMonthName(date).substring(0, 3)
    let dayInMonth = date.getDate()
    let year = date.getFullYear()
    let fDate = `${monthName} ${dayInMonth} ${year}`
    return fDate
}

function update(mailToUpdate) {
    let mails = _loadFromStorage(MAINKEY)
    mails = mails.map(mail => mail.id === mailToUpdate.id ? mailToUpdate : mail)
    _saveToStorage(MAINKEY, mails)
    return Promise.resolve(mailToUpdate)
}

function _createMail(subject = utilService.makeLorem(3), body = utilService.makeLorem(50), date = dateGen().date, to = getMailAdders(), from = nameGen().from, fromName = nameGen().fromName, status = nameGen().status, fDate = dateGen().fDate) {
    console.log(subject, body, date, to, from, fromName, status, fDate);
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: date,
        to,
        from,
        fromName,
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

function nameGen() {
    const fromNames = ['James', 'John', 'Robert', 'Michael', 'David', 'William',
        'Richard', 'Joseph', 'Thomas', 'Christopher', 'Charles', 'Daniel', 'Matthew', 'Anthony'
        , 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian',
        'George', 'Timothy',
        'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara',
        'Susan', 'Jessica', 'Sarah', 'Karen', 'Lisa', 'Nancy', 'Betty', 'Margaret'
        , 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Carol', 'Amanda', 'Dorothy',
        'Melissa', 'Deborah', 'coding academy', 'Yaron Biton', 'Tommy Irmia', 'Alex Yakovlev', 'Elhanan Avihail',
        'Idan Gaz', 'Michael Aharoni', 'Rona Fainshtein'
    ]
    const fromName = fromNames[utilService.getRandomIntInclusive(0, fromNames.length - 1)]
    const from = `${fromNames}@appSus.com`

    return {
        fromName,
        from,
        status: 'inbox',
    }
}
dateGen()
function dateGen() {
    const intDate = utilService.getRandomIntInclusive(1640000000000, 1661900000000)
    const date = new Date(intDate)
    const fDate = formatDate(date)
    return {
        date,
        fDate,
    }
}

const gMails = [
    {
        id: utilService.makeId(),
        subject: 'Your project amazed me',
        body: 'I was happy to come across your project, it really lifted my spirits and made my day',
        isRead: false,
        sentAt: dateGen().date,
        to: 'user@appsus.com',
        from: 'Yaron@appsus.com',
        fromName: 'Yaron Biton',
        status: 'inbox',
        fDate: dateGen().fDate,
    },
    {
        id: utilService.makeId(),
        subject: 'Outstanding Student Award',
        body: 'I am happy to inform you that the Supreme Committee has decided to award you the Outstanding Student Award for 2022',
        isRead: true,
        sentAt: dateGen().date,
        to: 'user@appsus.com',
        from: 'Tommy@appsus.com',
        fromName: 'Tommy Irmia',
        status: 'inbox',
        fDate: dateGen().fDate,
    },
    {
        id: utilService.makeId(),
        subject: 'You have not used your subscription for two months',
        body: 'Hello, after a data analysis, we discovered that you have not used your subscription at all in the last two months. We wanted to find out if your connection is working and if the content is to your liking',
        isRead: false,
        sentAt: dateGen().date,
        to: 'user@appsus.com',
        from: 'Netflix@appsus.com',
        fromName: 'Netflix     ',
        status: 'inbox',
        fDate: dateGen().fDate,
    },
    {
        id: utilService.makeId(),
        subject: 'Your order has been launched',
        body: 'Hello, your order is ready, in the next few minutes a courier will pick it up and bring you a wonderful pizza to your door',
        isRead: false,
        sentAt: dateGen().date,
        to: 'user@appsus.com',
        from: 'Dominos@appsus.com',
        fromName: 'Dominos Pizza',
        status: 'inbox',
        fDate: dateGen().fDate,
    },

    {
        id: utilService.makeId(),
        subject: 'All day you\'re at the computer, I thought maybe that\'s how I\'ll get you',
        body: 'End of August and your two daughters at home do you think you can take a few hours off to take them to the beach?',
        isRead: true,
        sentAt: dateGen().date,
        to: 'user@appsus.com',
        from: 'wife@appsus.com',
        fromName: 'dear wife',
        status: 'inbox',
        fDate: dateGen().fDate,
    },
    {
        id: utilService.makeId(),
        subject: ' A first-party GitHub OAuth application has been added to your account',
        body: 'A first-party GitHub OAuth application (Git Credential Manager) with gist, repo, and workflow scopes was recently authorized to access your account. Visit on our website for more information. Thanks, The GitHub Team',
        isRead: false,
        sentAt: dateGen().date,
        to: 'user@appsus.com',
        from: 'GitHub@appsus.com',
        fromName: 'GitHub Team ',
        status: 'inbox',
        fDate: dateGen().fDate,
    },

    {
        id: utilService.makeId(),
        subject: 'Good night',
        body: 'I\'m going to sleep, we\'ll continue tomorrow :)',
        isRead: true,
        sentAt: dateGen().date,
        to: 'Team@appsus.com',
        from: 'user@appsus.com',
        fromName: 'Me     ',
        status: 'sent',
        fDate: dateGen().fDate,
    },

    {
        id: utilService.makeId(),
        subject: 'We\'re almost done',
        body: 'almost',
        isRead: true,
        sentAt: dateGen().date,
        to: 'Team@appsus.com',
        from: 'user@appsus.com',
        fromName: 'Me     ',
        status: 'draft',
        fDate: dateGen().fDate,
    },

    {
        id: utilService.makeId(),
        subject: 'We\'re almo......',
        body: 'alost kff',
        isRead: true,
        sentAt: dateGen().date,
        to: 'Team@appsus.com',
        from: 'user@appsus.com',
        fromName: 'Me     ',
        status: 'trash',
        fDate: dateGen().fDate,
    },



]