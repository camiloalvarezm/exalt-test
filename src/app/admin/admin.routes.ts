import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // children: [
    //   {
    //     path: 'client',
    //     component: LoginClientsComponent,
    //   },
    //   {
    //     path: 'admin',
    //     component: LoginAdminComponent,
    //   },
    // ],
  },
];
