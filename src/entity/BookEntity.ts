/* eslint-disable @typescript-eslint/naming-convention */

class BookEntity {
  id: number
  title: string
  writer: string
  cover_image: string
  price: number
  tags: string

  constructor(
    id: number,
    title: string,
    writer: string,
    cover_image: string,
    price: number,
    tags: string
  ) {
    this.id = id
    this.title = title
    this.writer = writer
    this.cover_image = cover_image
    this.price = price
    this.tags = tags
  }
}

export default BookEntity
