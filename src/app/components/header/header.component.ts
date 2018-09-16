import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() { }

  logout(): void {
    this.authService.logout()
      .then(data => {
        this.router.navigate(['/'])
      })
      .catch(error => {
        
      })
  }
}
