import { User } from '../models';

export class UserStorage {
  private static USERS_KEY = 'nisum_users';
  private static TOKEN_KEY = 'nisum_token';
  private static LOGGED_USER_KEY = 'nisum_logged_user';

  static getUsers(): User[] {
    const users = localStorage.getItem( UserStorage.USERS_KEY );
    return users ? JSON.parse( users ) : [];
  }

  static registerDefaultUser() {
    const defaultUser = { id: new Date().getTime(), name: 'Max Alva', email: 'max@gmail.com', password: 'password' };


    let users = JSON.parse( localStorage.getItem( UserStorage.USERS_KEY ) ?? '[]' );

    if ( !Array.isArray( users ) ) {
      users = [];
    }

    if ( users.length === 0 ) {
      users.push( defaultUser );
      localStorage.setItem( UserStorage.USERS_KEY, JSON.stringify( users ) );
    }
  }

  static getUserByEmail( email: string ): User | null {
    const users: User[] = UserStorage.getUsers();
    return users.find( u => u.email?.toLowerCase() === email.toLowerCase() ) ?? null;
  }

  static addUser( user: User ) {
    const users: User[] = UserStorage.getUsers();
    users.push( user );
    localStorage.setItem( UserStorage.USERS_KEY, JSON.stringify( users ) );
  }

  static setLoggedUser( user: User ) {
    localStorage.setItem( UserStorage.LOGGED_USER_KEY, JSON.stringify( user ) );
  }

  static getLoggedUser(): User | null {
    const user = localStorage.getItem( UserStorage.LOGGED_USER_KEY );
    return user ? JSON.parse( user ) : null;
  }

  static signOut() {
    localStorage.removeItem( UserStorage.LOGGED_USER_KEY );
    localStorage.removeItem( UserStorage.TOKEN_KEY );
  }

  static setToken( token: string ) {
    localStorage.setItem( UserStorage.TOKEN_KEY, token );
  }

  static getToken(): string | null {
    return localStorage.getItem( UserStorage.TOKEN_KEY ) ?? null;
  }
}
