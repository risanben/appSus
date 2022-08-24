import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const NoteService = {
    query,
}

const NOTES_KEY = 'noteDB'

function query() {
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
            txt: '"We cannot solve problems with the kind of thinking we employed when we came up with them." - Albert Einstein',
            color: 'white'
        }
    },
    {
        id: utilService.makeId(),
        type: 'image',
        details: {
            txt: "https://i.pinimg.com/originals/36/b4/12/36b412f2fe633271876071a5c911b45a.jpg",
            color: 'white'
        }
    },
    {
        id: utilService.makeId(),
        type: 'video',
        details: {
            txt: "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/SintelVideo.mp4",
            color: 'white'
        }
    },
    {
        id: utilService.makeId(),
        type: 'todo',
        details: {
            txt: 'remember to have lunch even if the after-class ends at 15:30pm',
            color: 'white'
        }
    },
    {
        id: utilService.makeId(),
        type: 'text',
        details: {
            txt:'“When you change your thoughts, remember to also change your world.”—Norman Vincent Peale',
            color: 'white'
        }
    },
    {
        id: utilService.makeId(),
        type: 'image',
        details: {
            txt: "https://i.pinimg.com/originals/d5/64/66/d5646649cd1ff260f26edf6a7b28a54e.jpg",
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
            txt: "https://www.tabulait.com/wp-content/uploads/2022/01/Laptop-1000x667-1.jpg",
            color: 'white'
        }
    },
    {
        id: utilService.makeId(),
        type: 'text',
        details: {
            txt:'Learn as if you will live forever, live like you will die tomorrow. - Mahatma Gandhi',
            color: 'white'
        }
    },
    {
        id: utilService.makeId(),
        type: 'video',
        details: {
            txt: "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/ElephantsDreamVideo.mp4",
            color: 'white'
        }
    },


]