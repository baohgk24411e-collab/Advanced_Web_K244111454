import { Component, signal } from '@angular/core';
import { Product } from '../classes/iProducts';
import { ProductHttpService } from '../services/product-http-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list-advanced-component',
  standalone: false,
  styleUrl: './product-list-advanced-component.css',
  templateUrl: './product-list-advanced-component.html',
})
export class ProductListAdvancedComponent {
  products = signal<Product[]>([]);
  errMessage = signal("");
  constructor(private _service: ProductHttpService,
          private router:Router,
          private activateRoute:ActivatedRoute) {}

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    void this.router.navigateByUrl('/login');
  }

  ngOnInit():void
  {
    this._service.getProductList().subscribe({
      next:(data)=>
        {
        this.products.set(data)
      },
      error:(err)=>
        {
        this.errMessage.set(err)
      }
    });
  }
  viewDetail(id:number)
  {
    this.router.navigate(["/products",id])
  }

  generateSlug(name: string, id: number): string {
    const normalizedName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return `${normalizedName}-${id}`;
  }

  viewDetailSlug(product: Product): void {
    this.viewDetail(product.id);
  }
}
