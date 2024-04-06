import type Book from '../entity/BookEntity.ts'
import type BookRepository from '../repository/BookRepository.ts'

class BookService {
  private readonly bookRepository: BookRepository

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async getAllBooks(): Promise<Book[]> {
    try {
      return await this.bookRepository.getAllBooks()
    } catch (error) {
      console.error('Error fetching all books:', error)
      throw new Error('Error fetching all books')
    }
  }

  async getBookById(bookId: number): Promise<Book> {
    try {
      return await this.bookRepository.getBookById(bookId)
    } catch (error) {
      console.error('Error fetching book by ID:', error)
      throw new Error('Error fetching book by ID')
    }
  }

  async createBook(book: Book): Promise<Book> {
    try {
      return await this.bookRepository.createBook(book)
    } catch (error) {
      console.error('Error creating book:', error)
      throw new Error('Error creating book')
    }
  }

  async updateBook(bookId: number, book: Book): Promise<Book> {
    try {
      return await this.bookRepository.updateBook(bookId, book)
    } catch (error) {
      console.error('Error updating book:', error)
      throw new Error('Error updating book')
    }
  }

  async deleteBook(bookId: number): Promise<void> {
    try {
      await this.bookRepository.deleteBook(bookId)
    } catch (error) {
      console.error('Error deleting book:', error)
      throw new Error('Error deleting book')
    }
  }
}

export default BookService
