import { bookService } from './book.service.js'
import { utilService } from './util.service.js'

const GOOGLE_BOOKS_KEY = 'googleBookDB'
const GOOGLE_BOOKS_API_KEY = window.GOOGLE_BOOKS_API_KEY || ''
const SEARCH_TTL_MS = 2 * 60 * 1000

export const googleBookService = {
    query,
    save,
    getStoredBooks,
    getStoredSearchTxt,
    isSearchStale,
    clearStaleSearch,
    touchStoredSearch,
}

function getStoredBooks() {
    const { books } = utilService.loadFromStorage(GOOGLE_BOOKS_KEY) || {}
    return books ? books.map(({id, title}) => ({id, title})) : []
}

function getStoredSearchTxt() {
    const { txt } = utilService.loadFromStorage(GOOGLE_BOOKS_KEY) || {}
    return txt || ''
}

function isSearchStale(urlTxt) {
    const { txt: storedTxt, ts } = utilService.loadFromStorage(GOOGLE_BOOKS_KEY) || {}
    const isExpired = !ts || Date.now() - ts > SEARCH_TTL_MS
    return !urlTxt || isExpired || !new RegExp(urlTxt, 'i').test(storedTxt || '')
}

function clearStaleSearch(urlTxt) {
    if (isSearchStale(urlTxt)) utilService.saveToStorage(GOOGLE_BOOKS_KEY, { txt: '', books: [] })
}

function touchStoredSearch() {
    const stored = utilService.loadFromStorage(GOOGLE_BOOKS_KEY)
    if (stored) utilService.saveToStorage(GOOGLE_BOOKS_KEY, { ...stored, ts: Date.now() })
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
            utilService.saveToStorage(GOOGLE_BOOKS_KEY, { txt, books, ts: Date.now() })
            return books
        })
}

function save(bookId) {
    const { books } = utilService.loadFromStorage(GOOGLE_BOOKS_KEY) || {}
    const book = books && books.find(book => book.id === bookId)
    
    if (!book) return Promise.reject(new Error(`Cannot find google book with id: ${bookId}`))

    const { id, ...newBook } = book
    
    return bookService.save(newBook)
        .then(savedBook => savedBook.id)
        .catch(err => {
            console.log('err', err)
            throw err
        })
}