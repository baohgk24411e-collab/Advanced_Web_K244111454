import { Component, signal } from '@angular/core';
import { Product } from '../classes/iProducts';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-serviceproduct-http-handle-error-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list-search-component',
  standalone: false,
  templateUrl: './product-list-search-component.html',
  styleUrl: './product-list-search-component.css',
})
export class ProductListSearchComponent {
  // Toàn bộ sản phẩm từ server
  products=signal<Product[]>([]);
  //check error
  errMessage=signal("")
  // Sản phẩm sau khi đã lọc
  filteredProducts = signal<Product[]>([]);
  // Biến giữ giá trị lọc để hiển thị lên UI
  minPrice = signal<number>(0);
  maxPrice = signal<number>(100000000);
constructor(private _service:ProductHttpHandleErrorService,
    private router:Router,
    private activateRoute:ActivatedRoute){
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    void this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    // 1. Tải toàn bộ sản phẩm về trước
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
        this.watchQueryParams();
      },error: (err) =>{
        this.errMessage.set(err.message)
      }
    });
  }
  public generateSlug(name: string, id: number): string {
    const normalizedName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return `${normalizedName}-${id}`;
  }

  private watchQueryParams() {
    this.activateRoute.queryParamMap.subscribe(params => {
      const min = Number(params.get('min')) || 0;
      const max = Number(params.get('max')) || 100000000;
      this.minPrice.set(min);
      this.maxPrice.set(max);
      // Thực hiện lọc logic
      const result = this.products().filter(p => p.price >= min && p.price <= max);
      this.filteredProducts.set(result);
    });
  }
// Hàm gọi khi nhấn nút "Lọc"
  onFilter() {
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {
        min: this.minPrice(),
        max: this.maxPrice()
      },
      queryParamsHandling: 'merge' // Giữ lại các params khác nếu có
    });
  }

  showAll(): void {
    this.minPrice.set(0);
    this.maxPrice.set(100000000);
    this.errMessage.set('');
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: { min: null, max: null },
      queryParamsHandling: 'merge',
    });
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
        this.filteredProducts.set(data);
      },
      error: (err: Error) => {
        this.errMessage.set(err.message);
      },
    });
  }

  clearProducts(): void {
    this.products.set([]);
    this.filteredProducts.set([]);
  }

  viewDetail(id:number)
  {
    this.router.navigate(["/products",id])
  }
  viewDetailSlug(p:Product)
  {
  this.router.navigate(['/products', p.id]);
  }  
}
