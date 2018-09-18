import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public navbarOpen = false;

  constructor() { }

  ngOnInit() { }

  public toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
