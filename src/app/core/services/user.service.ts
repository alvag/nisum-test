import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '@/core/models';
import { UserStorage } from '@/core/utils/user-storage.utils';

@Injectable( {
  providedIn: 'root'
} )
export class UserService {
  private userSubject = new BehaviorSubject<User | null>( null );
  user$ = this.userSubject.asObservable();

  constructor() {
    this.userSubject.next( UserStorage.getLoggedUser() );
  }

  updateUser( user: User ) {
    UserStorage.setLoggedUser( user );
    this.userSubject.next( user );
  }
}
