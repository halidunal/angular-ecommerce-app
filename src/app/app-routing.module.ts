import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/new', component: NewProductComponent},
  {path: 'categories/new', component: NewCategoryComponent},
  {path: 'products/:productId', component: ProductComponent},
  {path: 'products/categories/:categoryId', component: ProductListComponent},
  {path: 'auth', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
