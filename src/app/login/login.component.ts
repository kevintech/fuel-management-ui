import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any;

  constructor(private service: AuthenticationService) { }

  ngOnInit() {
    this.service.login().subscribe(user => this.user = user);
  }

}
