import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { UserType } from '../../core/models/user-type';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public userType!: UserType;

  constructor(private router: Router) {}

  login(event: UserType): void {
    this.userType = event;
    this.router.navigate(['auth/sign-in'], { queryParams: this.userType });
  }
}
