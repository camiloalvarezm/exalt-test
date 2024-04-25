import { Component, OnInit } from '@angular/core';
import { UserType } from '../../core/models/user-type';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-clients',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  public userType!: UserType;
  public formData = {
    email: '',
    password: '',
  };

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params: any) => {
      this.userType = params;
    });
  }

  onSubmit(): void {
    console.log(this.formData);
  }
}
