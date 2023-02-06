import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor() {}
  @ViewChild('navBurger') navBurger: ElementRef | undefined;
  @ViewChild('navMenu') navMenu: ElementRef | undefined;

  toggleNavbar() {
    if (this.navBurger && this.navMenu) {
      this.navBurger.nativeElement.classList.toggle('is-active');
      this.navMenu.nativeElement.classList.toggle('is-active');
    }
  }
}
