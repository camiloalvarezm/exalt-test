import { Component, OnInit } from '@angular/core';
import { UserType } from '../../core/models/user-type.model';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AltertMessage } from '../../core/models/alert-message.model';

@Component({
  selector: 'app-login-clients',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  public userType!: UserType;
  public formData = {
    email: '',
    password: '',
  };
  public alertMessage: AltertMessage = {
    message: '',
    typeAlert: 'success',
  };
  public showAlert = false

  constructor(private activateRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params: any) => {
      this.userType = params;
    });
  }

  onSubmit(): void {
    console.log(this.formData);
  }

  goToRegister(): void {
    this.router.navigate(['auth/sign-up'], {
      queryParams: {
        id: 0,
        name: this.userType.name.includes('Cliente')
          ? 'Registro Cliente'
          : 'Registro Administrador',
      },
    });
  }
}
