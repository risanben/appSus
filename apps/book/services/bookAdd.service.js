import { storageService } from "../services/storage.service.js"

export const bookAddService = {
    getBooks,
}

const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=`
const STORAGE_KEY = 'google-booksDB'
let gCache


function getBooks(value) {
    gCache = storageService.loadFromStorage(STORAGE_KEY) || {}
    // console.log('value:', value)
    if (gCache[value]) {
        console.log('providing results from Cache')
        return Promise.resolve(gCache[value])
    } else {
        console.log('providing results from server')
        const currUrl = `${url}${value}`
        return axios.get(currUrl)
            .then((res) => {
                console.log('res:', res)
                gCache[value] = res.data.items
                _saveSearchToStorage()
                return res.data.items
            })
    }
}

function _saveSearchToStorage() {
    storageService.saveToStorage(STORAGE_KEY, gCache)
}