import { Component, OnInit } from '@angular/core';
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

  constructor(
    private service: AuthenticationService,
    private formBuilder: FormBuilder) { }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.minLength(10)],
      password: ['', Validators.required]
    });
    this.service.login().subscribe(user => this.user = user);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.invalid);
    if (this.loginForm.invalid) {
      return true;
    }
  }

}
