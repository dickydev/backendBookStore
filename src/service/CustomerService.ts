import type CustomerRepository from '../repository/CustomerRepository.ts'
import type CustomerEntity from '../entity/CustomerEntity.ts'

class CustomerService {
  private readonly customerRepository: CustomerRepository

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async loginByNameAndEmail(
    name: string,
    email: string
  ): Promise<CustomerEntity | null> {
    try {
      // Panggil method dari repository untuk mencari pelanggan berdasarkan nama dan email
      const customer = await this.customerRepository.getCustomerByNameAndEmail(
        name,
        email
      )
      return customer
    } catch (error) {
      console.error('Error logging in customer by name and email:', error)
      throw new Error('Error logging in customer by name and email')
    }
  }

  async getAllCustomers(): Promise<CustomerEntity[]> {
    try {
      return await this.customerRepository.getAllCustomers()
    } catch (error) {
      console.error('Error fetching customers:', error)
      throw new Error('Error fetching customers')
    }
  }

  async getCustomerById(customerId: number): Promise<CustomerEntity | null> {
    try {
      return await this.customerRepository.getCustomerById(customerId)
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
  ): Promise<CustomerEntity | null> {
    try {
      return await this.customerRepository.createCustomer(
        id,
        name,
        email,
        points
      )
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
      return await this.customerRepository.updateCustomer(
        customerId,
        name,
        email,
        points
      )
    } catch (error) {
      console.error('Error updating customer:', error)
      throw new Error('Error updating customer')
    }
  }

  async deleteCustomer(customerId: number): Promise<void> {
    try {
      await this.customerRepository.deleteCustomer(customerId)
    } catch (error) {
      console.error('Error deleting customer:', error)
      throw new Error('Error deleting customer')
    }
  }

  async getLatestCustomerId(): Promise<number> {
    try {
      const customers = await this.getAllCustomers()
      if (customers.length === 0) {
        throw new Error('No customers found')
      }
      const latestId = this.findLatestCustomerId(customers)
      return latestId
    } catch (error) {
      console.error('Error fetching latest customer ID:', error)
      throw new Error('Error fetching latest customer ID')
    }
  }

  private async getAllCustomers2(): Promise<any[]> {
    try {
      return await this.customerRepository.getAllCustomers()
    } catch (error) {
      console.error('Error fetching customers:', error)
      throw new Error('Error fetching customers')
    }
  }

  private findLatestCustomerId(customers: any[]): number {
    return customers.reduce((maxId, customer) => {
      return customer.id > maxId ? customer.id : maxId
    }, 0)
  }

  async updateCustomerPoints(
    customerId: number,
    points: number
  ): Promise<void> {
    try {
      await this.customerRepository.updateCustomerPoints(customerId, points)
    } catch (error) {
      console.error('Error updating customer points:', error)
      throw new Error('Error updating customer points')
    }
  }
}

export default CustomerService
