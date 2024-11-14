import { Routes } from '@angular/router';
import { authGuard } from '@/core/guards';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('@/pages/register/register.component')
  },
  {
    path: 'login',
    loadComponent: () => import('@/pages/login/login.component')
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@/pages/dashboard/dashboard.component'),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('@/pages/dashboard/components/home/home.component')
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
