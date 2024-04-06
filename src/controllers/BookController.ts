/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         genre:
 *           type: string
 *       required:
 *         - title
 *         - author
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       '200':
 *         description: A list of books
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '201':
 *         description: New book created
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to get
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The book data
 *       '404':
 *         description: Book not found
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *       '404':
 *         description: Book not found
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Book deleted successfully
 *       '404':
 *         description: Book not found
 */

import { type Request, type Response } from 'express'
import type BookService from '../service/BookService.ts'

class BookController {
  private readonly bookService: BookService

  constructor(bookService: BookService) {
    this.bookService = bookService
  }

  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getAllBooks()
      res.json(books)
    } catch (error) {
      console.error('Error fetching all books:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async getBookById(req: Request, res: Response): Promise<void> {
    const { bookId } = req.params
    if (isNaN(Number(bookId))) {
      res.status(400).json({ message: 'Invalid book ID' })
      return
    }

    try {
      const book = await this.bookService.getBookById(Number(bookId))
      if (book == null) {
        res.status(404).json({ message: 'Book not found' })
      } else {
        res.json(book)
      }
    } catch (error) {
      console.error('Error fetching book by ID:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async createBook(req: Request, res: Response): Promise<void> {
    const bookData = req.body
    try {
      const newBook = await this.bookService.createBook(bookData)
      res.json(newBook)
    } catch (error) {
      console.error('Error creating book:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async updateBook(req: Request, res: Response): Promise<void> {
    const bookId = parseInt(req.params.id)
    const bookData = req.body
    try {
      const updatedBook = await this.bookService.updateBook(bookId, bookData)
      res.json(updatedBook)
    } catch (error) {
      console.error('Error updating book:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    const { bookId } = req.params
    if (isNaN(Number(bookId))) {
      res.status(400).json({ message: 'Invalid book ID' })
      return
    }

    try {
      await this.bookService.deleteBook(Number(bookId))
      res.json({ message: 'Book deleted successfully' })
    } catch (error) {
      console.error('Error deleting book:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

export default BookController
