export interface Product{
    id: number,
    name: string,
    price: number | string,
    isInStock: boolean,
    imageUrl: string,
    description: string,
    categoryId: number,
}