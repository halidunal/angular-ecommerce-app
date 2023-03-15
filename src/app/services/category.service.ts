import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
  private url = "https://ng-ecommerce-app-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http
      .get<Category[]>(this.url + "categories.json")
      .pipe(map(result => {
        const categories: Category[] = [];
        for(let key in result){
          categories.push({...result[key], id: key})
        }
        return categories
      }))
  }

  createCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.url + "/categories.json", category)
  }

}
