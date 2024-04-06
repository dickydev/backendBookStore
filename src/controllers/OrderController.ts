/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         customer_id:
 *           type: integer
 *         book_id:
 *           type: integer
 *         status:
 *           type: string
 *       required:
 *         - customer_id
 *         - book_id
 *         - status
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       '200':
 *         description: A list of orders
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       '201':
 *         description: New order created
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to get
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The order data
 *       '404':
 *         description: Order not found
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       '200':
 *         description: Order updated successfully
 *       '404':
 *         description: Order not found
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Order deleted successfully
 *       '404':
 *         description: Order not found
 */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Request, type Response } from 'express'
import type OrderService from '../service/OrderService.ts'

class OrderController {
  private readonly orderService: OrderService

  constructor(orderService: OrderService) {
    this.orderService = orderService
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderService.getAllOrders()
      res.json(orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params
    try {
      const order = await this.orderService.getOrderById(Number(orderId))
      if (order == null) {
        res.status(404).json({ message: 'Order not found' })
      } else {
        res.json(order)
      }
    } catch (error) {
      console.error('Error fetching order by ID:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    const { customer_id, book_id, status } = req.body
    try {
      const newOrder = await this.orderService.createOrder(
        customer_id,
        book_id,
        status
      )
      res.status(201).json(newOrder)
    } catch (error) {
      console.error('Error creating order:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params
    try {
      await this.orderService.deleteOrder(Number(orderId))
      res.json({ message: 'Order deleted successfully' })
    } catch (error) {
      console.error('Error deleting order:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

export default OrderController
