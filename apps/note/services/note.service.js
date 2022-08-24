import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const NoteService = {
    query,
}

const NOTES_KEY = 'noteDB'

function query() {
    console.log('entered query')
    let notes = storageService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = gNotes
        storageService.saveToStorage(NOTES_KEY, notes)
    }

    return Promise.resolve(notes)
}




const gNotes = [
    {
        id: utilService.makeId(),
        type: 'text',
        details: {
            txt: 'We cannot solve problems with the kind of thinking we employed when we came up with them. - Albert Einstein',
            color: 'white'
        }
    },
    {
        id: utilService.makeId(),
        type: 'todo',
        details: {
            txt: 'remember to complete sprint 3 so Yaron can be proud',
            color: 'white'
        }
    },
    {
        id: utilService.makeId(),
        type: 'image',
        details: {
            txt: "https://cdn.britannica.com/96/1296-050-4A65097D/gelding-bay-coat.jpg",
            color: 'white'
        }
    }
]