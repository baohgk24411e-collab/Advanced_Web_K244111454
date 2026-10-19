import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { BindingPropertyComponent } from './binding-property-component/binding-property-component';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindingStyleComponent } from './binding-style-component/binding-style-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component/product-http-handle-error-service-component';
import { Exercise13Component } from './exercise13/exercise13';
import { Exercise14Component } from './exercise14/exercise14';
import { Exercise18Component } from './exercise18/exercise18';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { ContactComponent } from './component/component';
import { authGuard } from './classes/auth.guard';
import { CourseRegistrationComponent } from './course-registration-component/course-registration-component';
import { LoginComponent } from './login-component/login-component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { FakeProductComponent2 } from './fake-product-component2/fake-product-component2';
import { BooksComponent } from './books-component/books-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { BookNewComponent } from './book-new-component/book-new-component';
import { BookUpdateComponent } from './book-update-component/book-update-component';
import { BookDeleteComponent } from './book-delete-component/book-delete-component';
import { FashionComponent } from './fashion-component/fashion-component';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';
import { FashionNewComponent } from './fashion-new-component/fashion-new-component';
import { FashionUpdateComponent } from './fashion-update-component/fashion-update-component';
import { FashionDeleteComponent } from './fashion-delete-component/fashion-delete-component';

const routes: Routes = [
  { path: 'binding-property-component', component: BindingPropertyComponent },
  { path: 'binding-class-component', component: BindingClassComponent },
  { path: 'binding-style-component', component: BindingStyleComponent },
  { path: 'binding-event-component', component: BindingEventComponent },
  { path: 'binding-two-way-component', component: BindingTwoWayComponent },
  { path: 'product-list-component', component: ProductListComponent },
  { path: 'product-dropdown-list-component', component: ProductDropdownListComponent },
  { path: 'product-list-call-service-component', component: ProductListCallServiceComponent },
  { path: 'product-list-call-http-service-component', component: ProductListCallHttpServiceComponent },
  { path: 'product-http-handle-error-service-component', component: ProductHttpHandleErrorServiceComponent },
  { path: 'product-list-advanced-component', component: ProductListAdvancedComponent, canActivate: [authGuard] },
  { path: 'product-list-search-component', component: ProductListSearchComponent, canActivate: [authGuard] },
  {path: 'login',component: LoginComponent},
  {path: 'fakeproducts', component: FakeProductComponent2},
  {path: 'booklist', component: BooksComponent},
  {path: 'bookdetail', component: BookDetailComponent},
  {path: 'booknew', component: BookNewComponent},
  {path: 'bookupdate', component: BookUpdateComponent},
  {path: 'bookdelete', component: BookDeleteComponent},
  {path: 'fashionlist', component: FashionComponent},
  {path: 'fashiondetail', component: FashionDetailComponent},
  {path: 'fashionnew', component: FashionNewComponent},
  {path: 'fashionupdate', component: FashionUpdateComponent},
  {path: 'fashiondelete', component: FashionDeleteComponent},
  {
    path: 'lazy-component',
    loadComponent: () =>
      import('./lazy-component/lazy-component').then(c => c.LazyComponent),
  },
  {
    path:'samplenested',
    component:ProductListAdvancedComponent,
    children:[
      {path:'search',component:ProductListSearchComponent},
      {path:'detail/:id',component:ProductDetailComponent}
    ]
  },
  { path: 'product-detail-component', redirectTo: 'products/1', pathMatch: 'full' },
  { path: '', component: ContactComponent },

  //Product Detail
  { path: 'products/:id', component: ProductDetailComponent},

  // Exercise 13
  { path: 'exercise13', component: Exercise13Component },
  { path: 'excercise13', component: Exercise13Component },
  { path: "exercise13/:id", component: Exercise13Component },

  // Exercise 14
  { path: 'exercise14', component: Exercise14Component },
  { path: 'excercise14', component: Exercise14Component },

  // Exercise 18
  { path: 'exercise18', component: Exercise18Component },
  { path: 'excercise18', component: Exercise18Component },
  {
    path:"lazyinfor",
    loadComponent: ()=>
      import('./lazy-component/lazy-component')
        .then(c=>c.LazyComponent),
    canActivate: [authGuard],
  },
  {
    path: 'course-registration', component: CourseRegistrationComponent
  },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
