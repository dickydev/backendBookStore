/* eslint-disable @typescript-eslint/naming-convention */
class OrderEntity {
  id: number
  customer_id: number
  book_id: number
  status: string

  constructor(
    id: number,
    customer_id: number,
    book_id: number,
    status: string
  ) {
    this.id = id
    this.customer_id = customer_id
    this.book_id = book_id
    this.status = status
  }
}

export default OrderEntity
