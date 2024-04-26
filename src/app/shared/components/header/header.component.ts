import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faGauge } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public faCartShopping = faCartShopping;
  public faRightFromBracket = faRightFromBracket;
  public faGauge = faGauge;
  public faStore = faStore;
  public userRole!: string;
  public showCart = false;
  public showDashboard = false;

  constructor(private router: Router) {
    this.userRole = localStorage.getItem('role') || '';
    this.showCart = this.router.url.includes('home');
    this.showDashboard = this.router.url.includes('dashboard');
  }

  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  goToDashboard() {
    this.router.navigateByUrl('/admin/dashboard');
  }

  goToStore() {
    this.router.navigateByUrl('/client/home');
  }
}
