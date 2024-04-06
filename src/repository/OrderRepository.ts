/* eslint-disable @typescript-eslint/no-unsafe-argument */
import pool from '../db/connect.ts'
import OrderEntity from '../entity/OrderEntity.ts'

class OrderRepository {
  async getAllOrders(): Promise<OrderEntity[]> {
    try {
      const query = 'SELECT * FROM orders'
      const result = await pool.query(query)
      return result.rows.map(
        (row: any) =>
          new OrderEntity(row.id, row.customer_id, row.book_id, row.status)
      )
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw new Error('Error fetching orders')
    }
  }

  async getOrderById(orderId: number): Promise<OrderEntity | null> {
    try {
      const query = 'SELECT * FROM orders WHERE id = $1'
      const result = await pool.query(query, [orderId])
      if (result.rows.length === 0) {
        return null
      }
      const row = result.rows[0]
      return new OrderEntity(row.id, row.customer_id, row.book_id, row.status)
    } catch (error) {
      console.error('Error fetching order by ID:', error)
      throw new Error('Error fetching order by ID')
    }
  }

  async createOrder(
    customerId: number,
    bookId: number,
    status: string
  ): Promise<OrderEntity | null> {
    try {
      const query =
        'INSERT INTO orders (customer_id, book_id, status) VALUES ($1, $2, $3) RETURNING id, customer_id, book_id, status'
      const result = await pool.query(query, [
        customerId,
        bookId,
        status
      ] as any[])
      const newRow = result.rows[0]
      return new OrderEntity(
        newRow.id,
        newRow.customer_id,
        newRow.book_id,
        newRow.status
      )
    } catch (error) {
      console.error('Error creating order:', error)
      throw new Error('Error creating order')
    }
  }

  async updateOrder(
    orderId: number,
    status: string
  ): Promise<OrderEntity | null> {
    try {
      const query = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *'
      const result = await pool.query(query, [status, orderId] as any[])
      if (result.rows.length === 0) {
        return null
      }
      const row = result.rows[0]
      return new OrderEntity(row.id, row.customer_id, row.book_id, row.status)
    } catch (error) {
      console.error('Error updating order:', error)
      throw new Error('Error updating order')
    }
  }

  async deleteOrder(orderId: number): Promise<void> {
    try {
      const query = 'DELETE FROM orders WHERE id = $1'
      await pool.query(query, [orderId])
    } catch (error) {
      console.error('Error deleting order:', error)
      throw new Error('Error deleting order')
    }
  }
}

export default OrderRepository
