import { Location } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Product } from '../classes/iProducts';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-serviceproduct-http-handle-error-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  styleUrl: './product-detail-component.css',
  templateUrl: './product-detail-component.html',
})
  export class ProductDetailComponent {
    product=signal<Product|null>(null);
    errMessage=signal("")
    constructor(private _service:ProductHttpHandleErrorService,
        private location:Location,
        private activateRoute:ActivatedRoute){
    }
  ngOnInit():void{
      this.activateRoute.paramMap.subscribe(
        (param)=>{
          let idParam=param.get('id')
          if(idParam!=null)
          {
            let id=parseInt(idParam)
            this._service.getProductById(id).subscribe(
              {
                next:(data)=>{
                  this.product.set(data??null);
                },
                error: (err) =>{
                  this.errMessage.set(err)
                }
              }
            )
          }
        }
      );
    }
  goBack()
  {
    this.location.back();
  }
  }
