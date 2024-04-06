/* eslint-disable @typescript-eslint/naming-convention */
import type OrderRepository from '../repository/OrderRepository.ts'
import OrderEntity from '../entity/OrderEntity.ts'

class OrderService {
  private readonly orderRepository: OrderRepository

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  async getAllOrders(): Promise<OrderEntity[]> {
    try {
      return await this.orderRepository.getAllOrders()
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw new Error('Error fetching orders')
    }
  }

  async getOrderById(orderId: number): Promise<OrderEntity | null> {
    try {
      return await this.orderRepository.getOrderById(orderId)
    } catch (error) {
      console.error('Error fetching order by ID:', error)
      throw new Error('Error fetching order by ID')
    }
  }

  async createOrder(
    customer_id: number,
    book_id: number,
    status: string
  ): Promise<OrderEntity | null> {
    try {
      return await this.orderRepository.createOrder(
        customer_id,
        book_id,
        status
      )
    } catch (error) {
      console.error('Error creating order:', error)
      throw new Error('Error creating order')
    }
  }

  async deleteOrder(orderId: number): Promise<void> {
    try {
      await this.orderRepository.deleteOrder(orderId)
    } catch (error) {
      console.error('Error deleting order:', error)
      throw new Error('Error deleting order')
    }
  }
}

export default OrderService
