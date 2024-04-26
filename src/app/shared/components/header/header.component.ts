import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private router: Router) {}

  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/auth');
  }
}
