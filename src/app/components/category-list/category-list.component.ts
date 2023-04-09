import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryService]
})
export class CategoryListComponent implements OnInit {

  categories: Category[];
  selectedCategory: Category | null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    })
  }

  displayAll = true;
  selectCategory(category?: Category) {
    if(category){
      this.selectedCategory = category
      this.displayAll = false;
    }else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }

}
