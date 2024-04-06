/* eslint-disable @typescript-eslint/naming-convention */

import pool from '../db/connect.ts'
import type BookEntity from '../entity/BookEntity.ts'

class BookRepository {
  async getAllBooks(): Promise<BookEntity[]> {
    try {
      const query = 'SELECT * FROM book'
      const result = await pool.query(query)
      return result.rows.map((row: any) => this.mapToBook(row))
    } catch (error) {
      console.error('Error fetching all book:', error)
      throw new Error('Error fetching all book')
    }
  }

  async getBookById(bookId: number): Promise<BookEntity> {
    try {
      const query = 'SELECT * FROM book WHERE id = $1'
      const result = await pool.query(query, [bookId])
      if (result.rows.length === 0) {
        throw new Error('Book not found')
      }
      return this.mapToBook(result.rows[0])
    } catch (error) {
      console.error('Error fetching book by ID:', error)
      throw new Error('Error fetching book by ID')
    }
  }

  async createBook(book: BookEntity): Promise<BookEntity> {
    try {
      const { title, writer, cover_image, price, tags } = book
      const query =
        'INSERT INTO book (title, writer, cover_image, price, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *'
      const result = await pool.query(query, [
        title,
        writer,
        cover_image,
        price,
        tags
      ] as any[])
      return this.mapToBook(result.rows[0])
    } catch (error) {
      console.error('Error creating book:', error)
      throw new Error('Error creating book')
    }
  }

  async updateBook(bookId: number, book: BookEntity): Promise<BookEntity> {
    try {
      const { title, writer, cover_image, price, tags } = book
      const query =
        'UPDATE book SET title = $1, writer = $2, cover_image = $3, price = $4, tags = $5 WHERE id = $6 RETURNING *'
      const result = await pool.query(query, [
        title,
        writer,
        cover_image,
        price,
        tags,
        bookId
      ] as any[])
      if (result.rows.length === 0) {
        throw new Error('Book not found')
      }
      return this.mapToBook(result.rows[0])
    } catch (error) {
      console.error('Error updating book:', error)
      throw new Error('Error updating book')
    }
  }

  async deleteBook(bookId: number): Promise<void> {
    try {
      const query = 'DELETE FROM book WHERE id = $1 RETURNING *'
      const result = await pool.query(query, [bookId])
      if (result.rows.length === 0) {
        throw new Error('Book not found')
      }
    } catch (error) {
      console.error('Error deleting book:', error)
      throw new Error('Error deleting book')
    }
  }

  private mapToBook(row: any): BookEntity {
    return {
      id: row.id,
      title: row.title,
      writer: row.writer,
      cover_image: row.cover_image,
      price: row.price,
      tags: row.tags
    }
  }
}

export default BookRepository
