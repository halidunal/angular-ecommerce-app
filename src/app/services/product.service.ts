import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, delay, take, exhaustMap } from "rxjs";
import { Product } from "../models/product";
import { AuthService } from "./auth.service";

@Injectable()
export class ProductService {
    private url = "https://ng-ecommerce-app-default-rtdb.europe-west1.firebasedatabase.app/";

    constructor(private authService: AuthService, private http: HttpClient) {

    }

    getProducts(categoryId: number): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.url + "products.json")
            .pipe(map(response => {
                const products: Product[] = [];

                for(let key in response) {
                    if(categoryId){
                        if(categoryId == response[key].categoryId){
                            products.push({...response[key], id: key})
                        }
                    }else{
                        products.push({...response[key], id: key})
                    }
                }
                return products;
            }), delay(500));
    }

    getProductById(id: string): Observable<Product>{
        return this.http.get<Product>(this.url + "products/" + id + ".json").pipe(delay(500))
    }

    createProduct(product: Product): Observable<Product>{
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                //firabase write rule: ".write": "auth != null"
                return this.http.post<Product>(this.url + "products.json?auth=" + user?.token, product);
            })
        )
    }
}