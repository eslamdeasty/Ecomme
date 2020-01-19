import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/Ilogin';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



export interface UserDetails {
  _id: string;
  name: string;
  email: string;
  password: string;
  tasks: any;
  exp: number;
  iat: number;

}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  _id: string;
 name: string;
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  user: User;
  loggedIn = new BehaviorSubject(this.user);

  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken');
    }
    return this.token;
  }

  public getUserDetails(): any {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedin(): boolean {
    if (localStorage.getItem('usertoken')) {
      return true;
    } else {
      return false;
    }
  }

  public register(user: any): Observable<any> {
    user = JSON.parse(user);
    user = {
      _id: null,
     name: user.username,
      email: user.email,
      password: user.password
    };
    const base = this.http.post('http://localhost:3000/api/users/register', user);
    console.log(user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public login(user: any): Observable<any> {
    user = JSON.parse(user);
    const base = this.http.post('http://localhost:3000/api/users/login', user);
    console.log(user);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public profile(): Observable<any> {
    return this.http.get('http://localhost:3000/api/users/profile', {
      headers: { Authorization: ` ${this.getToken()}` }
    });
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('usertoken');
    this.router.navigateByUrl('/');
  }

  isLoggedIn(): boolean {
    console.log(this.loggedIn);
    return true;
  }

  getShoppingCart(): Observable<any> {
    const token = localStorage.getItem('usertoken');
    const httpOptions =  { headers: new HttpHeaders({
      Authorization: token})
    };
    if (token) {
    return this.http.get(`http://localhost:3000/api/users/getshoppingcart`, httpOptions);
  } else {
    return;
  }
}

  updateCart(itemIndex: number, quantity: number): Observable<any>{
    const item = {itemIndex,quantity}
    const token = localStorage.getItem('usertoken')
    const httpOptions =  { headers: new HttpHeaders({
      Authorization: token})
    };
    if (token) {
    return this.http.put(`http://localhost:3000/api/users/updateCart`, item, httpOptions);
  } else {
    return;
  }
  }
}
