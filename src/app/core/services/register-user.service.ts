import { Injectable } from '@angular/core';
import { User } from '@/core/models';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class RegisterUserService {
  private static readonly usersKey = 'nisum_users';

  static registerDefaultUser() {
    const defaultUser = { id: new Date().getTime(), name: 'Max Alva', email: 'max@gmail.com', password: 'password' };


    let users = JSON.parse( localStorage.getItem( this.usersKey ) ?? '[]' );

    if ( !Array.isArray( users ) ) {
      users = [];
    }

    if ( users.length === 0 ) {
      users.push( defaultUser );
      localStorage.setItem( this.usersKey, JSON.stringify( users ) );
    }
  }

  getUserByEmail( email: string ): User | null {
    const users: User[] = JSON.parse( localStorage.getItem( RegisterUserService.usersKey ) ?? '[]' );
    return users.find( u => u.email?.toLowerCase() === email.toLowerCase() ) ?? null;
  }

  addUser( userData: User ): Observable<User> {
    const users: User[] = JSON.parse( localStorage.getItem( RegisterUserService.usersKey ) ?? '[]' );

    // Verificar si el email ya existe
    if ( users.some( u => u.email?.toLowerCase() === userData.email?.toLowerCase() ) ) {
      return throwError( () => new Error( 'El email ya está registrado' ) ).pipe(
        delay( 2000 ) // Simulamos delay en el error también
      );
    }

    const newUser: User = {
      ...userData,
      id: new Date().getTime()
    };

    users.push( newUser );
    localStorage.setItem( RegisterUserService.usersKey, JSON.stringify( users ) );

    // Retornamos observable con delay de 2 segundos para simular una llamada a un endpoint
    return of( newUser ).pipe(
      delay( 2000 )
    );
  }
}
