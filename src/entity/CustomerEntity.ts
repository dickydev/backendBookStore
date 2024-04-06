class CustomerEntity {
  id: number
  name: string
  email: string
  points: number

  constructor(id: number, name: string, email: string, points: number) {
    this.id = id
    this.name = name
    this.email = email
    this.points = points
  }
}

export default CustomerEntity
