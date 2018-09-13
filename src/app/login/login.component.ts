import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any;
  private loginForm: FormGroup;
  private submitted = false;
  private error = false;

  constructor(
    private service: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.service.login().subscribe(user => this.user = user);
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.error = true;
      return true;
    }

    this.service.login().subscribe(
      data => {
        console.log('login success', data);
        this.error = false;
        this.router.navigate(['home']);
      },
      error => {
        console.error(error);
        this.error = true;
      });
  }

}
