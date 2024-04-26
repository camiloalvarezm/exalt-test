import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { isAdminAuthenticatedGuard } from '../guards/is-admin-authenticated.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [isAdminAuthenticatedGuard],
  },
];
