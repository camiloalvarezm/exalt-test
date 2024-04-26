import { Component, OnInit, inject } from '@angular/core';
import { UserType } from '../../core/models/user-type.model';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../api/user.service';
import { User } from '../../core/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-login-clients',
  standalone: true,
  imports: [FormsModule, LoaderComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  public userType!: UserType;
  public formData = {
    email: '',
    password: '',
  };
  public activateRoute = inject(ActivatedRoute);
  public router = inject(Router);
  public userService = inject(UserService);
  public toaster = inject(ToastrService);
  public showLoader = false;

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params: any) => {
      this.userType = params;
    });
    this.showLoader = true;
    if (!localStorage.getItem('clients')) {
      this.userService.getClientUsers().subscribe((res: any) => {
        localStorage.setItem('clients', JSON.stringify(res));
        this.showLoader = false;
      });
    }
    if (!localStorage.getItem('admins')) {
      this.userService.getAdminUsers().subscribe((res: any) => {
        localStorage.setItem('admins', JSON.stringify(res));
        this.showLoader = false;
      });
    }
    this.showLoader = false;
  }

  onSubmit(): void {
    console.log(this.userType);
    if (this.formData.email == '' || this.formData.password == '') {
      console.log('complete todos los campos');
      return;
    }
    this.showLoader = true;
    setTimeout(() => {
      if (this.userType.id == 0) {
        const clients = JSON.parse(localStorage.getItem('clients') || '[]');
        if (this.userType.name.includes('Ingreso')) {
          const user = this.findUser(clients);
          if (user) {
            this.storageToken(0);
            this.router.navigateByUrl('client/home');
          } else {
            this.toaster.error('Email o contraseña incorrecta.', 'Error');
          }
          this.showLoader = false;
          return;
        }
        clients.push(this.formData);
        localStorage.setItem('clients', JSON.stringify(clients));
        this.router.navigate(['/auth/sign-in'], {
          queryParams: { id: 0, name: 'Ingreso Cliente' },
        });
        this.showLoader = false;
        this.toaster.success(
          'El usuario ha sido registrado existosamente.',
          'Cliente creado'
        );
        return;
      }
      if (this.userType.id == 1) {
        const admins = JSON.parse(localStorage.getItem('admins') || '[]');
        if (this.userType.name.includes('Ingreso')) {
          const user = this.findUser(admins);
          if (user) {
            this.storageToken(1);
            this.router.navigateByUrl('admin/dashboard');
          } else {
            this.toaster.error('Email o contraseña incorrecta.', 'Error');
          }
          this.showLoader = false;
          return;
        }
        admins.push(this.formData);
        localStorage.setItem('admins', JSON.stringify(admins));
        this.router.navigate(['/auth/sign-in'], {
          queryParams: { id: 1, name: 'Ingreso Administrador' },
        });
        this.toaster.success(
          'El usuario ha sido registrado existosamente.',
          'Administrador creado'
        );
        this.showLoader = false;
        return;
      }
    }, 1500);
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
