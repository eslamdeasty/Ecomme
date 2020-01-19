import { Globals } from './../../globals';
import { Component, OnInit, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/Ilogin';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loadingEnable: boolean;
  sidenavEnable = false;
  globals : Globals;
  @Input()
  user: User;

  @Output()
  sidenav = new EventEmitter();

  toggelSidenav() {
    this.sidenav.emit('toggel');
  }

  constructor(public dialog: MatDialog, private router: Router, 
    public loginService: LoginService,
    public loadingService: LoadingService,
    globals: Globals) { 
      this.globals = globals;
    }

  shoppingCart;
  totalQuantity = 0;
  ngOnInit() {
    this.loginService.getShoppingCart().subscribe(
    (data)=>{
      this.shoppingCart = data.cart;
      for (let i=0; i < this.shoppingCart.length; i++){
       this.globals.quantity = this.shoppingCart[i].quantity + this.globals.quantity;
      }
      
      console.log(this.shoppingCart)
    }
    )
    this.user = this.loginService.getUserDetails();
    this.loadingService.progressEnable.subscribe(next => {
      this.loadingEnable = next;
    });
  }


  enableSidenav() {
    this.sidenavEnable = !this.sidenavEnable;
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  logout() {
    this.user = null;

    this.loginService.loggedIn.next(this.user);
    this.router.navigate(['home']);
  }
}
