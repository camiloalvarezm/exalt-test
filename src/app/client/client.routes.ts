import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    // children: [
    //   {
    //     path: 'client',
    //     component: LoginClientsComponent,
    //   },
    //   {
    //     path: 'admin',
    //     component: LoginAdminComponent
    //   },
    // ]
  }
];
