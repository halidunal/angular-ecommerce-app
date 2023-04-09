import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, map, take } from 'rxjs';
import { Category } from '../models/category';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class CategoryService {
  private url = "https://ng-ecommerce-app-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getCategories(): Observable<Category[]>{
    return this.http
      .get<Category[]>(this.url + "categories.json")
      .pipe(map(response => {
        const categories: Category[] = [];
        for(let key in response){
          categories.push({...response[key], id: key})
        }
        return categories
      }))
  }

  createCategory(category: Category): Observable<Category>{
    return this.authenticationService.user.pipe(
      take(1),
      exhaustMap(user => {
        //firabase write rule: ".write": "auth != null"
        return this.http.post<Category>(this.url + "/categories.json?auth=" + user?.token, category)  
      })
    )
  }
}
