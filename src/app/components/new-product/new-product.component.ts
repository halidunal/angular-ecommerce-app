import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [CategoryService]
})
export class NewProductComponent implements OnInit {
  categories: Category[] = [];
  error: string = "";
  model: any = {
    categoryId: 0
  };
  constructor(private productService: ProductService, private rooter: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(result =>{
      this.categories = result;
    })
  }

  createProduct(){
    // name: any, price: any, description: any, imageUrl: any, isInStock: any, categoryId: any
    // if(name.value == "" || name.value.length < 2){
    //   this.error = "Ürün ismi 2 karakterden az olamaz!";
    //   return;
    // }

    // if(price.value == ""){
    //   this.error = "Ürünün fiyat bilgisini giriniz!";
    //   return;
    // }

    if(this.model.categoryId == "0"){
      this.error = "Ürün kategorisini seçiniz!";
      return;
    }

    const product = {name: this.model.name, price: this.model.price, isInStock: this.model.isInStock, imageUrl: this.model.imageUrl, title: this.model.title, description: this.model.description, categoryId: this.model.categoryId}

    this.productService.createProduct(product).subscribe(result => {
      this.rooter.navigate(["/products"])
    })  
  }
}
