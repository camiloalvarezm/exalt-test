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
    if (!localStorage.getItem('clients')) {
      this.userService.getClientUsers().subscribe((res: any) => {
        localStorage.setItem('clients', JSON.stringify(res));
      });
    }
    if (!localStorage.getItem('admins')) {
      this.userService.getAdminUsers().subscribe((res: any) => {
        localStorage.setItem('admins', JSON.stringify(res));
      });
    }
  }

  onSubmit(): void {
    console.log(this.userType);
    if (this.formData.email == '' || this.formData.password == '') {
      console.log('complete todos los campos');
      return;
    }
    if (this.userType.id == 0) {
      const clients = JSON.parse(localStorage.getItem('clients') || '[]');
      if (this.userType.name.includes('Ingreso')) {
        const user = this.findUser(clients);
        if (user) {
          this.storageToken(0);
          this.router.navigateByUrl('client/home');
        }
        return;
      }
      clients.push(this.formData);
      localStorage.setItem('clients', JSON.stringify(clients));
      this.router.navigate(['/auth/sign-in'], {
        queryParams: { id: 0, name: 'Ingreso Cliente' },
      });
      return;
    }
    if (this.userType.id == 1) {
      const admins = JSON.parse(localStorage.getItem('admins') || '[]');
      if (this.userType.name.includes('Ingreso')) {
        const user = this.findUser(admins);
        if (user) {
          this.storageToken(1);
          this.router.navigateByUrl('admin/dashboard');
        }
        return;
      }
      admins.push(this.formData);
      localStorage.setItem('admins', JSON.stringify(admins));
      this.router.navigate(['/auth/sign-in'], {
        queryParams: { id: 1, name: 'Ingreso Administrador' },
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
        id: this.userType.id,
        name: this.userType.name.includes('Cliente')
          ? 'Registro Cliente'
          : 'Registro Administrador',
      },
    });
  }
}
