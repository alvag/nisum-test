import { Injectable } from '@angular/core';
import { User } from '@/core/models';
import { delay, Observable, of, throwError } from 'rxjs';
import { UserStorage } from '@/core/utils/user-storage.utils';

@Injectable( {
  providedIn: 'root'
} )
export class RegisterUserService {

  addUser( userData: User ): Observable<User> {
    return new Observable( subscriber => {
      // Verificar si el email ya existe
      if ( UserStorage.getUserByEmail( userData.email?.toLowerCase() ?? '' ) ) {
        setTimeout( () => {
          subscriber.error( new Error( 'El email ya está registrado' ) );
          subscriber.complete();
        }, 2000 );
        return;
      }

      // Crear nuevo usuario
      const newUser: User = {
        ...userData,
        id: new Date().getTime()
      };

      // Simulamos una operación asíncrona
      setTimeout( () => {
        try {
          UserStorage.addUser( newUser );
          subscriber.next( newUser );
          subscriber.complete();
        } catch ( error ) {
          subscriber.error( error );
          subscriber.complete();
        }
      }, 2000 );
    } );
  }
}
