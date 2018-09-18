import { Component, OnInit } from '@angular/core'
import { Router,ActivatedRoute } from '@angular/router'
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
  private returnUrl: string

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.logout()
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  logout(): void {
    this.authService.logout()
    .then(data => {
      console.log('logout success')
    })
    .catch(error => {
      console.log('logout error')
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
        this.error = false
        this.router.navigate([this.returnUrl])
      })
      .catch(error => {
        this.error = true
      })
  }
}
