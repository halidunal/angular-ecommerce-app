import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, delay } from "rxjs";
import { Product } from "../models/product";

@Injectable()
export class ProductService {
    private url = "https://ng-ecommerce-app-default-rtdb.europe-west1.firebasedatabase.app/";

    constructor(private http: HttpClient) {

    }

    getProducts(categoryId: number): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.url + "products.json")
            .pipe(map(result => {
                const products: Product[] = [];

                for(let key in result) {
                    if(categoryId){
                        if(categoryId == result[key].categoryId){
                            products.push({...result[key], id: key})
                        }
                    }else{
                        products.push({...result[key], id: key})
                    }
                }
                return products;
            }), delay(500));
    }

    getProductById(id: string): Observable<Product>{
        return this.http.get<Product>(this.url + "products/" + id + ".json").pipe(delay(500))
    }

    createProduct(product: Product): Observable<Product>{
        return this.http.post<Product>(this.url + "products.json", product);
    }
}