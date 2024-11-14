import { Injectable } from '@angular/core';
import { LoginResponse, LoginUser } from '../models';
import { Observable } from 'rxjs';
import { UserStorage } from '../utils/user-storage.utils';

@Injectable( {
  providedIn: 'root'
} )
export class LoginService {

  login( user: LoginUser ): Observable<LoginResponse> {
    return new Observable( subscriber => {
      const dbUser = UserStorage.getUserByEmail( user?.email ?? '' );

      setTimeout( () => {
        if ( !dbUser || dbUser?.password !== user.password ) {
          subscriber.error( new Error( 'Credenciales incorrectas' ) );
          subscriber.complete();
          return;
        }

        const response: LoginResponse = {
          user: dbUser,
          token: 'fake_token'
        };

        UserStorage.setToken( response.token );
        UserStorage.setLoggedUser( response.user );

        subscriber.next( response );
        subscriber.complete();
      }, 2000 );
    } );
  }

}
