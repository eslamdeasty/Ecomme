import { HeaderComponent } from './common/header/header.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ShoppingCartComponent } from './myprofile/shopping-cart/shopping-cart.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileInformationComponent } from './myprofile/profile-information/profile-information.component';
import { ManageAddressComponent } from './myprofile/manage-address/manage-address.component';
import { ReviewsRatingComponent } from './myprofile/reviews-rating/reviews-rating.component';
import { SavedCardsComponent } from './myprofile/saved-cards/saved-cards.component';
import { WishlistComponent } from './myprofile/wishlist/wishlist.component';
import { MyRewardsComponent } from './myprofile/my-rewards/my-rewards.component';
import { NotificationsComponent } from './myprofile/notifications/notifications.component';
import {AuthService } from './services/auth-service';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product/:name',
    component: SingleProductComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },

  {
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [AuthService],
    children: [
      {
        path: 'profile',
        component: ProfileInformationComponent
      },
      {
        path: 'address',
        component: ManageAddressComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'reviews',
        component: ReviewsRatingComponent
      },
      {
        path: 'carddetails',
        component: SavedCardsComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'rewards',
        component: MyRewardsComponent
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]

  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '*', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
