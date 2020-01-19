import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormGroupDirective, Validators, FormBuilder, AbstractControl } from '@angular/forms';
// import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { MustMatch } from './MustMatch';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  userRegistered: boolean;

  constructor(private formBuilder: FormBuilder, 
              private userService: LoginService,
              private _router: Router,
              public dialog: MatDialog,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      mobilenumber: [null, [Validators.required, Validators.minLength(11)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      this.userService.register(JSON.stringify(this.registerForm.value))
        .subscribe(
          data => {
            console.log(data);
            if (data.status === "registered") { this.userRegistered = true } 
            else {
              this.toastr.success("Registered successfully");
               this._router.navigate(['/home']);

              };
          },
          error => console.error(error)
        );
    }



  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // console.log(JSON.stringify(this.registerForm.value));



}
