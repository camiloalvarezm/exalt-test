import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const CLIENT_ROUTES: Routes = [
  {
    path: '/client',
    redirectTo: '/client/home',
    pathMatch: 'full',
  },
  {
    path: '/client/home',
    component: HomeComponent,
    pathMatch: 'full',
  },
];
