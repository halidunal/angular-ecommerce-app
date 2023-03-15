import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product';
import { ProductRepository } from '../../models/product.repository';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product | null;
  loading: boolean = false;
  constructor(private route: ActivatedRoute, private productService: ProductService) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.productService.getProducts(params["categoryId"]).subscribe(result => {
        this.products = result;
        this.loading = false;
      })
    })
  }

  handleClickProduct(product: Product){
    this.selectedProduct = product;
  }
}
