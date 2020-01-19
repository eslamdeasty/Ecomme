import { HeaderComponent } from './../common/header/header.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/Ilogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  user = {} as any;
  wrongPassword = false;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private loginService: LoginService, 
    private fb: FormBuilder,
    private router: Router,
    ) {}

    ngOnInit() {
      this.loginForm = this.fb.group({
        email: [''],
        password: ['']
      })
    }
    login() {
      if (this.loginForm.valid){
        this.loginService.login(JSON.stringify(this.loginForm.value))
        .subscribe(data => { if (data.token) {
         this.wrongPassword = false;
         this.user =  this.loginService.getUserDetails();
         this.onNoClick();
         this.router.navigate(['/products']);
        } else if ( data.message === "Wrong password"){
          this.wrongPassword = true;
        } });
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
