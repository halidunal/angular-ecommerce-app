import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product | undefined;
  loading: boolean = false; 

  constructor(private route: ActivatedRoute, private productServices: ProductService) {  
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      const id = params['productId'];
      this.productServices.getProductById(id).subscribe(response => {
        this.product = {...response, id: id}
        this.loading = false;
      })
    })
  }

}
