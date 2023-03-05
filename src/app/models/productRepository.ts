import { Category } from "./category";
import { Product } from "./product"

export class ProductRepository {
    private products: Product[] = [
        {id: 1,name: "iphone14 beyaz",price: 20000,isInStock: true,imageUrl: "1.jpeg",description: "telefon", categoryId: 1},
        {id: 2,name: "iphone14 mavi",price: 12000,isInStock: true,imageUrl: "2.jpeg",description: "telefon", categoryId: 1},
        {id: 3,name: "iphone14 siyah",price: 15000,isInStock: true,imageUrl: "3.jpeg",description: "telefon", categoryId: 1},
        {id: 4,name: "iphone",price: 20000,isInStock: true,imageUrl: "1.jpeg",description: "bilgisayar", categoryId: 2},
        {id: 5,name: "zhone",price: 12000,isInStock: true,imageUrl: "2.jpeg",description: "bilgisayar", categoryId: 2},
        {id: 6,name: "chone",price: 15000,isInStock: true,imageUrl: "3.jpeg",description: "bilgisayar", categoryId: 2},
    ]    

    getProducts(): Product[] {
        return this.products.filter(p => p.isInStock);
    }

    getProductById(id: number): Product | undefined {
        return this.products.find(p => p.id == id);
    }

    getProductByCategoryId(id: number): Product[] {
        return this.products.filter(p => p.categoryId == id)
    }
}

