
import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent  implements OnInit{
  addProductMessage:string|undefined
   constructor(private product:ProductService) { }
   ngOnInit(): void {
     
   }
   submit(data:product) {
     console.log(data);
     this.product.addproduct(data).subscribe((result)=> {
      console.log(result);
      if(result) {
        this.addProductMessage="product is successfuly added "
      }
      setTimeout(()=> this.addProductMessage=undefined,3000);
     })
     
   }
}
