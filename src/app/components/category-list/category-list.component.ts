import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryRepository } from 'src/app/models/categoryRepository';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];
  selectedCategory: Category | null;
  categoryRepository: CategoryRepository;
  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.categories = this.categoryRepository.getCategories();
   }

  ngOnInit(): void {
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
