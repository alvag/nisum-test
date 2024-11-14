import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('@/pages/register/register.component')
  },
  {
    path: 'login',
    loadComponent: () => import('@/pages/login/login.component')
  }
];
