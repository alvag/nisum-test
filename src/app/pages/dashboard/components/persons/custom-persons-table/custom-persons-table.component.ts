import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NotificationService, PersonsService } from '@/core/services';
import { CustomPerson, ResponsePerson } from '@/core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { pipe } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component( {
  selector: 'app-custom-persons-table',
  standalone: true,
  imports: [
    MatPaginator,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    RouterLink,
    MatIconButton,
    MatIcon,
    MatIconAnchor,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    DatePipe
  ],
  templateUrl: './custom-persons-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class PersonsCustomTableComponent implements OnInit {
  private destroyRef = inject( DestroyRef );
  private personService = inject( PersonsService );
  private notificationService = inject( NotificationService );
  page = 1;
  per_page = 3;
  total = 0;
  columns = ['id', 'email', 'first_name', 'last_name', 'fchnac', 'fchtermino', 'actions'];
  persons: CustomPerson[] = [];

  sliceDocuments = signal<CustomPerson[]>( [] );

  ngOnInit() {
    this.personService.customPersons$
    .pipe( takeUntilDestroyed( this.destroyRef ) )
    .subscribe( persons => {
      this.persons = persons;
      this.total = persons.length;

      this.sliceDocuments.set( this.persons.slice( ( this.page - 1 ) * this.per_page, ( this.page - 1 ) * this.per_page + this.per_page ) );
    } );
  }


  pageEvt( event: PageEvent ) {
    this.page = event.pageIndex + 1;
    this.per_page = event.pageSize;
  }

  deletePerson( id: number ) {
    this.personService.deletePerson( id );
    this.notificationService.success( 'Usuario eliminado correctamente' );
  }
}
