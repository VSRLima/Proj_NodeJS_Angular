import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public routeToHome() {
    this.router.navigate(['']);
  }

  public routeToInfo() {
    this.router.navigate(['/info']);
  }

  public routeToSellers() {
    this.router.navigate(['/sellers'])
  }
}
