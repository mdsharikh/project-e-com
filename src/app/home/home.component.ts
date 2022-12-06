import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:undefined | product[] ;
  trendyProduct:undefined | product[]
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      console.log(data);
      this.popularProducts=data;
    });
    this.product.trendyProduct().subscribe((data)=>{
      this.trendyProduct=data;
    })
 
}
}
