import { bookService } from './book.service.js'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const GOOGLE_BOOKS_KEY = 'googleBookDB'
const GOOGLE_BOOKS_API_KEY = window.GOOGLE_BOOKS_API_KEY || ''

export const googleBookService = {
    query,
    save,
    getStoredBooks,
}

function getStoredBooks() {
    const googleBooks = utilService.loadFromStorage(GOOGLE_BOOKS_KEY)
    return googleBooks ? googleBooks.map(({id, title}) => ({id, title})) : []
}

function query(txt, onSuccess, onError) {
    if (!txt || txt.length <= 2) return onSuccess([])

    getBooksFromGoogle(txt)
        .then(googleBooks => googleBooks.map(({id, title}) => ({id, title})))
        .then(onSuccess)
        .catch(onError)
}

function getBooksFromGoogle(txt) {
    const searchVal = encodeURIComponent(txt)
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes?printType=books'
    const apiKey = GOOGLE_BOOKS_API_KEY || ''

    return fetch(`${baseUrl}&q=${searchVal}&key=${apiKey}`)
        .then( response => {
            if (!response.ok) {
                throw new Error(`Error getting results from Google API - ${response.status}`)
            }
            return response.json()
        })
        .then(({items}) => {    
            const books = items.map(({volumeInfo}) => {
                const { authors, categories, description, imageLinks, language, pageCount, publishedDate, subtitle, title} = volumeInfo

                return ({
                    id: utilService.makeId(),
                    authors,
                    categories,
                    description,
                    language,
                    listPrice: bookService.getRandomPrice(),
                    pageCount,
                    publishedDate: (publishedDate || '2026').slice(0, 4),
                    subtitle,
                    thumbnail: (imageLinks && imageLinks.thumbnail) || '',
                    title,
                })
            })
            utilService.saveToStorage(GOOGLE_BOOKS_KEY, books)
            return books
        })
}

function save(id) {
    return storageService.get(GOOGLE_BOOKS_KEY, id)
        .then((book) => {
            const { id, ...newBook } = book
            return bookService.save(newBook).then(savedBook => savedBook.id)
        })
        .catch(err => {
            console.log('err', err)
            throw err
        })
}