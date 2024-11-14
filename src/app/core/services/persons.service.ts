import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomPerson, ResponsePerson } from '@/core/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class PersonsService {
  private readonly http = inject( HttpClient );
  private readonly apiUrl = 'https://reqres.in/api/users';

  customPersonsSubject = new BehaviorSubject<CustomPerson[]>( [] );
  customPersons$ = this.customPersonsSubject.asObservable();

  listPersons( params: { page: number, per_page: number } ): Observable<ResponsePerson> {
    return this.http.get<ResponsePerson>( this.apiUrl, { params } );
  }

  setCustomPerson( customPerson: CustomPerson ) {
    const customPersons = this.customPersonsSubject.getValue();
    const i = customPersons.findIndex( p => +p.id === +customPerson.id );

    if ( i >= 0 ) {
      customPersons.splice( i, 1 );
    }

    customPersons.unshift( customPerson );
    this.customPersonsSubject.next( customPersons );
  }
}
