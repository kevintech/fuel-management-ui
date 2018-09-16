import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication/authentication.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup
  private submitted = false
  private error = false

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.loginForm.invalid) {
      this.error = true
      return true
    }

    const userData = {
      email: this.f.email.value,
      password: this.f.password.value
    }

    this.authService.login(userData)
      .then(data => {
        console.log('login success', data)
        this.error = false
        this.router.navigate(['home'])
      })
      .catch(error => {
        console.error(error)
        this.error = true
      })
  }
}
