import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { isClientAuthenticatedGuard } from '../guards/is-client-authenticated.guard';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [isClientAuthenticatedGuard],
  },
];
