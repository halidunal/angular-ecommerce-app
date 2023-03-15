export interface Product{
    id?: number | string,
    name: string,
    price: number | string,
    isInStock: boolean,
    imageUrl: string,
    title: string,
    description: string,
    categoryId: number,
}