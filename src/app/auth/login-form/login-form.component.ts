import { Component, OnInit } from '@angular/core';
import { UserType } from '../../core/models/user-type.model';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../api/user.service';
import { User } from '../../core/models/user.model';

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

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params: any) => {
      this.userType = params;
    });
  }

  onSubmit(): void {
    if (this.formData.email == '' || this.formData.password == '') {
      console.log('complete todos los campos');
      return;
    }
    if (this.userType.id == 0) {
      this.userService.getClientUsers().subscribe((res: any) => {
        const user = this.findUser(res);
        if (user) {
          this.storageToken(0);
          this.router.navigateByUrl('client/home');
        }
      });
      return;
    }
    if (this.userType.id == 1) {
      this.userService.getAdminUsers().subscribe((res: any) => {
        const user = this.findUser(res);
        if (user) {
          this.storageToken(1);
          this.router.navigateByUrl('admin/dashboard');
        }
      });
      return;
    }
  }

  findUser(users: User[]): User | undefined {
    return users.find(
      (user: User) =>
        user.email === this.formData.email &&
        user.password === this.formData.password
    );
  }

  storageToken(userId: number) {
    localStorage.setItem('role', userId == 0 ? '0' : '1');
    localStorage.setItem('token', 'true');
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
