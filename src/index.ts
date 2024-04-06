/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express, { type Application, type Request, type Response } from 'express'
import bodyParser from 'body-parser'
import OrderController from './controllers/OrderController.ts'
import CustomerController from './controllers/CustomerController.ts'
import BookController from './controllers/BookController.ts'
import OrderService from './service/OrderService.ts'
import CustomerService from './service/CustomerService.ts'
import BookService from './service/BookService.ts'
import OrderRepository from './repository/OrderRepository.ts'
import CustomerRepository from './repository/CustomerRepository.ts'
import BookRepository from './repository/BookRepository.ts'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
// import pool from './db/connect.ts'

const app: Application = express()
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 4001

// Initialize repositories
const orderRepository = new OrderRepository()
const customerRepository = new CustomerRepository()
const bookRepository = new BookRepository()

// Initialize services
const orderService = new OrderService(orderRepository)
const customerService = new CustomerService(customerRepository)
const bookService = new BookService(bookRepository)

// Initialize controllers
const orderController = new OrderController(orderService)
const customerController = new CustomerController(customerService)
// const customerLoginController = new CustomerController()
const bookController = new BookController(bookService)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API'
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/controllers/*.ts'] // Path to your controller files
}

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions)

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Define routes
/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome message
 *     responses:
 *       200:
 *         description: Returns a welcome message
 */

app.get('/', (req: Request, res: Response) => {
  res.send('Hello')
})

// Define routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello')
})
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
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

app.get('/orders', orderController.getAllOrders.bind(orderController))
app.get('/orders/:orderId', orderController.getOrderById.bind(orderController))
app.post('/orders', orderController.createOrder.bind(orderController))
app.delete(
  '/orders/:orderId',
  orderController.deleteOrder.bind(orderController)
)

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API endpoints for managing customers
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

app.get(
  '/customers',
  customerController.getAllCustomers.bind(customerController)
)
app.get(
  '/customers/:customerId',
  customerController.getCustomerById.bind(customerController)
)
app.post(
  '/customers',
  customerController.createCustomer.bind(customerController)
)
app.post(
  '/customers/login',
  customerController.loginByNameAndEmail.bind(customerController)
)
app.put(
  '/customers/:customerId/points',
  customerController.updateCustomerPoints.bind(customerController)
)

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
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
app.get('/books', bookController.getAllBooks.bind(bookController))
app.get('/books/:bookId', bookController.getBookById.bind(bookController))
app.post('/books', bookController.createBook.bind(bookController))
app.delete('/books/:bookId', bookController.deleteBook.bind(bookController))

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
