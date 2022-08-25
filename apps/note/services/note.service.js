import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const NoteService = {
    query,
    removeNote,
    changeColor,
    addNote,
    saveUpdatedNote,
    togglePin
}

const NOTES_KEY = 'noteDB'

function query(filterBy) {
    let notes = storageService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = gNotes
        storageService.saveToStorage(NOTES_KEY, notes)
    }
    if (filterBy) {
        notes = notes.filter(note => note.type === filterBy)
    }
    return Promise.resolve(notes)
}

function removeNote(noteId) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = _getNoteIdx(noteId)
    notes.splice(noteIdx, 1)
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()

}

function addNote(txt, type) {
    let notes = storageService.loadFromStorage(NOTES_KEY)

    const newNote = {
        id: utilService.makeId(),
        type,
        details: {
            txt,
            color: 'white'
        },
        isNotePinned:false
    }

    notes.unshift(newNote)
    storageService.saveToStorage(NOTES_KEY, notes)

    return Promise.resolve()
}

function _getNoteIdx(noteId) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = notes.findIndex(note => noteId === note.id)
    return noteIdx
}

function changeColor(noteId, color) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = _getNoteIdx(noteId)
    notes[noteIdx].details.color = color
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()
}

function saveUpdatedNote(id,text){
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = _getNoteIdx(id)
    notes[noteIdx].details.txt = text
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()
}

function togglePin(id){
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = _getNoteIdx(id)
    notes[noteIdx].isNotePinned = !notes[noteIdx].isNotePinned
    if (notes[noteIdx].details.color = "lightpink"){
        notes[noteIdx].details.color = "white"
    } if (notes[noteIdx].details.color = "white"){
        notes[noteIdx].details.color = "lightpink"
    }
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()
}

const gNotes = [
 
    {
        id: utilService.makeId(),
        type: 'text',
        details: {
            txt: '"We cannot solve problems with the kind of thinking we employed when we came up with them." - Albert Einstein',
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'video',
        details: {
            txt: "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/ElephantsDreamVideo.mp4",
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'todo',
        details: {
            txt: 'TODO: remember to have lunch even if the after-class ends at 15:30pm',
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'text',
        details: {
            txt:'You define your own life. Dont let other people write your script. — Oprah Winfrey',
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'image',
        details: {
            txt: "https://i.pinimg.com/originals/36/b4/12/36b412f2fe633271876071a5c911b45a.jpg",
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'text',
        details: {
            txt:'“When you change your thoughts, remember to also change your world.”—Norman Vincent Peale',
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'video',
        details: {
            txt: "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/SintelVideo.mp4",
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'text',
        details: {
            txt:'Learn as if you will live forever, live like you will die tomorrow. - Mahatma Gandhi',
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'image',
        details: {
            txt: "https://i.pinimg.com/originals/d5/64/66/d5646649cd1ff260f26edf6a7b28a54e.jpg",
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'todo',
        details: {
            txt: 'TODO: remember to complete sprint 3 so Yaron can be proud',
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'image',
        details: {
            txt: "https://www.tabulait.com/wp-content/uploads/2022/01/Laptop-1000x667-1.jpg",
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'image',
        details: {
            txt: "https://i.pinimg.com/originals/1a/8f/1a/1a8f1a07c1ecb4f81cb9ab19963db30a.jpg",
            color: 'white'
        },
        isNotePinned: false
    },
    {
        id: utilService.makeId(),
        type: 'todo',
        details: {
            txt: "TODO : stay positive while Yaron is reviewing this code",
            color: 'white'
        },
        isNotePinned: false
    },

]