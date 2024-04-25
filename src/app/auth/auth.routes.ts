import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: LoginComponent,
    children: [
      {
        path: 'sign-in',
        component: LoginFormComponent,
      },
      {
        path: 'sign-up',
        component: LoginFormComponent,
      }
    ]
  }
];
