import { utilService } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

window.cs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then( books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) return storageService.put(BOOK_KEY, book)
    return storageService.post(BOOK_KEY, book)
}

function getEmptyBook(title='', listPrice = {}) {
    return {
        title,
        listPrice
    }
}

function getDefaultFilter(filteBy = { title: '' }) {
    return { title: filterBy.title }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            {
                id: utilService.makeId(),
                title: 'metus hendrerit',
                description: 'placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse',
                thumbnail: 'http://coding-academy.org/books-photos/20.jpg',
                listPrice: {
                    amount: 109,
                    currencyCode: 'EUR',
                    isOnSale: false
                }
            },
            {
                id: utilService.makeId(),
                title: 'morbi',
                description: 'aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor',
                thumbnail: 'http://coding-academy.org/books-photos/14.jpg',
                listPrice: {
                    amount: 44,
                    currencyCode: 'EUR',
                    isOnSale: true
                }
            },
            {
                id: utilService.makeId(),
                title: 'at viverra venenatis',
                description: 'lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant',
                thumbnail: 'http://coding-academy.org/books-photos/2.jpg',
                listPrice: {
                    amount: 108,
                    currencyCode: 'ILS',
                    isOnSale: false
                }
            },

        ]
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY)
        .then( books => {
            const bookIdx = books.findIndex( currBook => currBook.id === book.id)
            const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
            const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length -1]
            
            book.nextBookId = nextBook.id
            book.prevBookId = prevBook.id
            
            return book
        })
}