import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('@/pages/register/register.component').then( m => m.RegisterPageComponent )
  }
];
