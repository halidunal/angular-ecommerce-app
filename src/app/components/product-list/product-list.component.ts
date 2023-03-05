import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductRepository } from '../../models/productRepository';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  selectedProduct: Product | null;
  productRepository: ProductRepository;

  constructor(private route: ActivatedRoute) { 
    this.productRepository = new ProductRepository();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params["categoryId"]){
        this.products = this.productRepository.getProductByCategoryId(params["categoryId"])
      }else {
        this.products = this.productRepository.getProducts();
      }
    })
  }

  handleClickProduct(product: Product){
    this.selectedProduct = product;
  }
}
