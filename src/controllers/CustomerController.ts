/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API endpoints for managing customers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         points:
 *           type: integer
 *       required:
 *         - name
 *         - email
 *         - points
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       '200':
 *         description: A list of customers
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       '201':
 *         description: New customer created
 */

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to get
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The customer data
 *       '404':
 *         description: Customer not found
 *   put:
 *     summary: Update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       '200':
 *         description: Customer updated successfully
 *       '404':
 *         description: Customer not found
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Customer deleted successfully
 *       '404':
 *         description: Customer not found
 */

import { type Request, type Response } from 'express'
import type CustomerService from '../service/CustomerService.ts'

class CustomerController {
  private readonly customerService: CustomerService
  bind: any

  constructor(customerService: CustomerService) {
    this.customerService = customerService
  }

  async getAllCustomers(req: Request, res: Response): Promise<void> {
    try {
      const customers = await this.customerService.getAllCustomers()
      res.json(customers)
    } catch (error) {
      console.error('Error fetching customers:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async getCustomerById(req: Request, res: Response): Promise<void> {
    const { customerId } = req.params
    try {
      const customer = await this.customerService.getCustomerById(
        Number(customerId)
      )
      if (customer == null) {
        res.status(404).json({ message: 'Customer not found' })
      } else {
        res.json(customer)
      }
    } catch (error) {
      console.error('Error fetching customer by ID:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async createCustomer(req: Request, res: Response): Promise<void> {
    const { id, name, email, points } = req.body
    try {
      const newCustomer = await this.customerService.createCustomer(
        id,
        name,
        email,
        points
      )
      res.json(newCustomer)
    } catch (error) {
      console.error('Error creating customer:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async loginByNameAndEmail(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body
    try {
      const customer = await this.customerService.loginByNameAndEmail(
        name,
        email
      )
      if (customer != null) {
        res.status(200).json({ message: 'Login successful', customer })
      } else {
        res.status(401).json({ message: 'Invalid name or email' })
      }
    } catch (error) {
      console.error('Error logging in customer:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async getLatestCustomerId(req: Request, res: Response): Promise<void> {
    try {
      const latestId = await this.customerService.getLatestCustomerId()
      res.status(200).json({ latestId })
    } catch (error) {
      console.error('Error fetching latest customer ID:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async updateCustomerPoints(req: Request, res: Response): Promise<void> {
    const { customerId } = req.params
    const { points } = req.body
    try {
      await this.customerService.updateCustomerPoints(
        Number(customerId),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        points
      )
      res.json({ message: 'Customer points updated successfully' })
    } catch (error) {
      console.error('Error updating customer points:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

export default CustomerController
