import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, AuthenticationService } from '../services';
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';
export interface UserGroup {

  value: string;
  viewValue: string;

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  userGrps: UserGroup[] = [
    { value: 'admin', viewValue: 'Administrator' },
    { value: 'client', viewValue: 'Client' }
  ]
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
   // private alertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userGrp: ['client'],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]

    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username,this.loginForm.value.password)
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['/']);
        },
        error => {
          //  this.alertService.error(error);
            this.loading = false;
        });
  }

}
