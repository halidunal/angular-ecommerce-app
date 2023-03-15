import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent {
  constructor(private http: HttpClient, private productServices: ProductService) {

  }



}
