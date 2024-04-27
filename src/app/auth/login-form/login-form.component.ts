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
  public toastr = inject(ToastrService);
  public showLoader = false;
  public showValidations = false;

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params: any) => {
      this.userType = params;
    });
    this.showLoader = true;
    if (!localStorage.getItem('clients')) {
      this.userService.getClientUsers().subscribe({
        next: (res: any) => {
          localStorage.setItem('clients', JSON.stringify(res));
        },
        error: (error) => {
          this.toastr.error('Algo salió mal, intente más tarde.', 'Error');
        },
      });
      this.showLoader = false;
    }
    if (!localStorage.getItem('admins')) {
      this.userService.getAdminUsers().subscribe({
        next: (res: any) => {
          localStorage.setItem('admins', JSON.stringify(res));
        },
        error: (error) => {
          this.toastr.error('Algo salió mal, intente más tarde.', 'Error');
        },
      });
      this.showLoader = false;
    }
    this.showLoader = false;
  }

  onSubmit(): void {
    console.log(this.userType);
    if (this.formData.email == '' || this.formData.password == '') {
      this.showValidations = true;
      setTimeout(() => {
        this.showValidations = false;
      }, 3000);
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
            this.toastr.error('Email o contraseña incorrecta.', 'Error');
          }
          this.showLoader = false;
          return;
        }
        const userExist = this.userExists(clients);
        if (userExist) {
          this.toastr.error(
            'El email ya se encuentra registrado en el sistema. Intente con otro, o inicie sesión.',
            'Error'
          );
          this.showLoader = false;
          return;
        }
        clients.push(this.formData);
        localStorage.setItem('clients', JSON.stringify(clients));
        this.router.navigate(['/auth/sign-in'], {
          queryParams: { id: 0, name: 'Ingreso Cliente' },
        });
        this.showLoader = false;
        this.toastr.success(
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
            this.toastr.error('Email o contraseña incorrecta.', 'Error');
          }
          this.showLoader = false;
          return;
        }
        const userExist = this.userExists(admins);
        if (userExist) {
          this.toastr.error(
            'El email ya se encuentra registrado en el sistema. Intente con otro, o inicie sesión.',
            'Error'
          );
          this.showLoader = false;
          return;
        }
        admins.push(this.formData);
        localStorage.setItem('admins', JSON.stringify(admins));
        this.router.navigate(['/auth/sign-in'], {
          queryParams: { id: 1, name: 'Ingreso Administrador' },
        });
        this.toastr.success(
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

  userExists(users: User[]): User | undefined {
    return users.find((user: User) => this.formData.email === user.email);
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
