import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { OwlModule } from 'ngx-owl-carousel';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { FileSelectDirective } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';

import { SliderComponent } from './common/slider/slider.component';
import { FooterComponent } from './common/footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './myprofile/shopping-cart/shopping-cart.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileInformationComponent } from './myprofile/profile-information/profile-information.component';
import { ManageAddressComponent } from './myprofile/manage-address/manage-address.component';
import { SavedCardsComponent } from './myprofile/saved-cards/saved-cards.component';
import { MyRewardsComponent } from './myprofile/my-rewards/my-rewards.component';
import { ReviewsRatingComponent } from './myprofile/reviews-rating/reviews-rating.component';
import { NotificationsComponent } from './myprofile/notifications/notifications.component';
import { WishlistComponent } from './myprofile/wishlist/wishlist.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';


import {MatBadgeModule} from '@angular/material/badge'; 
import { Globals } from './globals';
@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    SliderComponent,
    FooterComponent,
    ProductsComponent,
    SingleProductComponent,
    LoginComponent,
    ShoppingCartComponent,
    MyprofileComponent,
    ProfileInformationComponent,
    ManageAddressComponent,
    SavedCardsComponent,
    MyRewardsComponent,
    ReviewsRatingComponent,
    NotificationsComponent,
    WishlistComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatIconModule,
    HttpClientModule,
     // Material
     MatBadgeModule,
     MatAutocompleteModule,
     MatButtonModule,
     MatButtonToggleModule,
     MatCardModule,
     MatCheckboxModule,
     MatChipsModule,
     MatDatepickerModule,
     MatDialogModule,
     MatExpansionModule,
     MatGridListModule,
     MatIconModule,
     MatInputModule,
     MatListModule,
     MatMenuModule,
     MatProgressBarModule,
     MatProgressSpinnerModule,
     MatRadioModule,
     MatRippleModule,
     MatSelectModule,
     MatSidenavModule,
     MatSlideToggleModule,
     MatSliderModule,
     MatSnackBarModule,
     MatStepperModule,
     MatTableModule,
     MatTabsModule,
     MatToolbarModule,
     MatTooltipModule,
     MatNativeDateModule,
     OwlModule,
     MatTreeModule,
     ReactiveFormsModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
