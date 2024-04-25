import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginClientsComponent } from './login-clients/login-clients.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/clients',
    component: LoginClientsComponent,
  },
  {
    path: 'login/admin',
    component: LoginAdminComponent,
  },
  { path: '**', component: PageNotFoundComponent }
];
