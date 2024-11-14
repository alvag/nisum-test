import { Router } from '@angular/router';
import { UserStorage } from '@/core/utils/user-storage.utils';
import { inject } from '@angular/core';

export const authGuard = () => {
  const router = inject( Router );

  // en este punto verificamos si el usuario esta autenticado,
  // en este caso solo verificamos que tenga un token en el storage
  if ( UserStorage.getToken() ) {
    return true;
  }

  // Redirigir al login
  router.navigate( ['/login'] );
  return false;
};
