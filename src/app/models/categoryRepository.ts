import { Category } from "./category"

export class CategoryRepository {
    private categories: Category[] = [
        {
            id: 1,
            name: "telefonlar"
        },
        {
            id: 2,
            name: "televizyon"
        },
        {
            id: 3,
            name: "bilgisayar"
        },
    ]

    getCategories(): Category[] {
        return this.categories;
    }

    getCategoryById(id: number){
        return this.categories.find(c => c.id == id)
    }
}