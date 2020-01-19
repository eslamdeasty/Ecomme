import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout, delay } from 'q';
import { Observable, of } from 'rxjs';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private loadingService: LoadingService,private http :  HttpClient  ) { }

  products =[];

  simillarProducts = [
    {
      id: 1,
      text: "Everfresh Flowers",
      image: ["https://ledscreensandlights.com/wp-content/uploads/2018/08/9.gif"]
    },
    {
      id: 2,
      text: "Festive Deer",
      image: ["https://cdn140.picsart.com/268948212025211.png?r1024x1024"]
    },
    {
      id: 3,
      text: "Morning Greens",
      image: ["http://pluspng.com/img-png/shoes-png-sneaker-png-transparent-image-2500.png"]
    },
    {
      id: 4,
      text: "Everfresh Flowers",
      image: ["https://i.pinimg.com/236x/36/9f/4c/369f4c4013e19c9b3c671de3dc696d2b.jpg"]
    },
  ];

  public addProduct(productData: FormData): Observable<any> {

    console.log(productData);
    return (this.http
      .post<any>('http://localhost:3000/api/products/add', productData));

  }
  
  getAllProducts(): any {
    return this.http.get('http://localhost:3000/api/products/getproducts')
  }

  getSimillarProducts(): any {
    return this.simillarProducts;
  }

  public getSingleProduct(name: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/products/getproducts/${name}`)
  }
  public addToCart(product : any) : Observable<any>{
  
    const token = localStorage.getItem('usertoken');
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload);
      const data  = {
      name: product.name,
      email: payload.email
    };
    console.log(data);
      return this.http.post('http://localhost:3000/api/products/addtocart' , data);
  }
}

}
