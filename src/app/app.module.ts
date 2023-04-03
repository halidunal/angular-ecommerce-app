import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NewProductComponent } from './components/new-product/new-product.component';
import { NewCategoryComponent } from './components/new-category/new-category.component'
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductComponent,
    CategoryListComponent,
    HomeComponent,
    NewProductComponent,
    NewCategoryComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
