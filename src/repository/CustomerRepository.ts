/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import pool from '../db/connect.ts'
import CustomerEntity from '../entity/CustomerEntity.ts'

class CustomerRepository {
  private readonly customers: CustomerEntity[]

  constructor() {
    this.customers = []
  }

  async getAllCustomers(): Promise<CustomerEntity[]> {
    const query = 'SELECT * FROM customer'
    const result = await pool.query(query)
    return result.rows.map(
      (row: any) => new CustomerEntity(row.id, row.name, row.email, row.points)
    )
  }

  async getCustomerById(customerId: number): Promise<CustomerEntity | null> {
    try {
      const query = 'SELECT * FROM customer WHERE id = $1'
      const result = await pool.query(query, [customerId])
      if (result.rows.length === 0) {
        return null
      }
      const row = result.rows[0]
      return new CustomerEntity(row.id, row.name, row.email, row.points)
    } catch (error) {
      console.error('Error fetching customer by ID:', error)
      throw new Error('Error fetching customer by ID')
    }
  }

  async createCustomer(
    id: number,
    name: string,
    email: string,
    points: number
  ): Promise<CustomerEntity> {
    try {
      const query =
        'INSERT INTO customer (id, name, email, points) VALUES ($1, $2, $3, $4) RETURNING *'
      const result = await pool.query(query, [id, name, email, points] as any[])
      const row = result.rows[0]
      return new CustomerEntity(row.id, row.name, row.email, row.points)
    } catch (error) {
      console.error('Error creating customer:', error)
      throw new Error('Error creating customer')
    }
  }

  async updateCustomer(
    customerId: number,
    name: string,
    email: string,
    points: number
  ): Promise<CustomerEntity | null> {
    try {
      const query =
        'UPDATE customer SET name = $1, email = $2, points = $3 WHERE id = $4 RETURNING *'
      const result = await pool.query(query, [
        name,
        email,
        points,
        customerId
      ] as any[])
      if (result.rows.length === 0) {
        return null
      }
      const row = result.rows[0]
      return new CustomerEntity(row.id, row.name, row.email, row.points)
    } catch (error) {
      console.error('Error updating customer:', error)
      throw new Error('Error updating customer')
    }
  }

  async deleteCustomer(customerId: number): Promise<void> {
    try {
      const query = 'DELETE FROM customer WHERE id = $1'
      await pool.query(query, [customerId])
    } catch (error) {
      console.error('Error deleting customer:', error)
      throw new Error('Error deleting customer')
    }
  }

  async getCustomerByNameAndEmail(
    name: string,
    email: string
  ): Promise<CustomerEntity | null> {
    try {
      const query = 'SELECT * FROM customer WHERE name = $1 AND email = $2'
      const result = await pool.query(query, [name, email])
      if (result.rows.length === 0) {
        return null
      }
      const row = result.rows[0]
      return new CustomerEntity(row.id, row.name, row.email, row.points)
    } catch (error) {
      console.error('Error fetching customer by name and email:', error)
      throw new Error('Error fetching customer by name and email')
    }
  }

  async getAllCustomers2(): Promise<any> {
    try {
      const result = await pool.query('SELECT * FROM customer')
      return result.rows
    } catch (error) {
      console.error('Error fetching customers:', error)
      throw new Error('Error fetching customers')
    }
  }

  async getLatestCustomerId(): Promise<number> {
    try {
      const query = 'SELECT MAX(id) AS latest_id FROM customer'
      const result = await pool.query(query)
      console.log(result.rows[0].latest_id)
      const latestIdString: string = result.rows[0].latest_id

      if (/^\d+$/.test(latestIdString)) {
        const latestId: number = parseInt(latestIdString)
        return latestId
      } else {
        console.error('Error fetching latest customer ID: Invalid data type')
        throw new Error('Error fetching latest customer ID')
      }
    } catch (error) {
      console.error('Error fetching latest customer ID:', error)
      throw new Error('Error fetching latest customer ID')
    }
  }

  async updateCustomerPoints(
    customerId: number,
    points: number
  ): Promise<void> {
    try {
      const query = 'UPDATE customer SET points = $1 WHERE id = $2'
      await pool.query(query, [points, customerId] as any[])
    } catch (error) {
      console.error('Error updating customer points:', error)
      throw new Error('Error updating customer points')
    }
  }
}

export default CustomerRepository
