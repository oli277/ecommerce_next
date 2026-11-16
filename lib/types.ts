export type Product = {
  id: number,
  name: string,
  description: string,
  review: number,
  image: string,
  category: string,
  dateAdded: string
}

export type Category = {
  name: string,
  slug: string,
  image: string
}