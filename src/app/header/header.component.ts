import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  sellerName: string = '';
  menuType: string = 'default';
  searchResult: undefined | product[];
  userName: string = '';
  cartItems=0;
  constructor(private route: Router, private product: ProductService) {}
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            let SellerStore = localStorage.getItem('seller');
            let sellerData = SellerStore && JSON.parse(SellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id)
        } else {
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if(cartData) {
      this.cartItems = JSON.parse(cartData).length
    }

    this.product.cartData.subscribe((items)=> {
     this.cartItems=items.length
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([])
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }

        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.route.navigate(['details/' + id]);
  }
  submitSearch(val: string) {
    console.log(val);
    this.route.navigate(['search/' + val]);
  }
}
