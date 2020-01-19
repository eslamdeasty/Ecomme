import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {Globals} from '../../globals';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart = [];
  totalPrice = 0;
  globals: Globals;
  
  constructor(private userService: LoginService,globals: Globals
    ) { this.globals = globals;}

  ngOnInit() {
    
    this.userService.getShoppingCart().subscribe(
      (data) => {
        this.shoppingCart = data.cart;
        this.globals.quantity = 0;
        for (let i = 0; i < this.shoppingCart.length; i++) {
          this.shoppingCart[i].subtotal = this.shoppingCart[i].price * this.shoppingCart[i].quantity;
          this.totalPrice = this.totalPrice +   this.shoppingCart[i].subtotal;
          this.globals.quantity = this.shoppingCart[i].quantity + this.globals.quantity;
        }
      }
      ,
      (err) => {
        console.log(err);
      }
    );
  }

  increaseQuantity(item) {
    item.quantity = Number(item.quantity) + 1;
    const itemIndex = this.shoppingCart.findIndex(x => x.name === item.name);
    this.userService.updateCart(itemIndex, item.quantity).subscribe(
      (data) => {
        // this.shoppingCart = data.cart
        console.log('Quantity increased successfully');
        this.totalPrice = 0;
        this.updatedCart(data.cart);
        
      },
      (err) => {
        console.log(err);
      }
    );
  }


  decreaseQuantity(item) {
    if (item.quantity > 1) {
      item.quantity = Number(item.quantity) - 1;
      const itemIndex = this.shoppingCart.findIndex(x => x.name === item.name);
      this.userService.updateCart(itemIndex, item.quantity).subscribe(
      (data) => {
        console.log('Quantity decreased successfully');
        this.totalPrice = 0;
        this.updatedCart(data.cart);
      },
      (err) => {
        console.log(err);
      }
    );
    }
  }

  updateCart(item) {
    const itemIndex = this.shoppingCart.findIndex(x => x.name === item.name);
    this.userService.updateCart(itemIndex, Number(item.quantity)).subscribe(
      (data) => {
        console.log('Quantity increased successfully');
        this.totalPrice=0;
        this.updatedCart(data.cart);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updatedCart(cart) {
    this.globals.quantity = 0;
    for (let i = 0; i < this.shoppingCart.length ; i++) {
      this.shoppingCart[i].subtotal = this.shoppingCart[i].price * this.shoppingCart[i].quantity;
      this.totalPrice = this.shoppingCart[i].subtotal + this.totalPrice;
      this.globals.quantity = this.globals.quantity + cart[i].quantity;
  }
}
}
