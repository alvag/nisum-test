import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PersonsService } from '@/core/services';
import { ResponsePerson } from '@/core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component( {
  selector: 'app-persons-table',
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
    MatRowDef
  ],
  templateUrl: './persons-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class PersonsTableComponent implements OnInit {
  private destroyRef = inject( DestroyRef );
  private personService = inject( PersonsService );
  responsePerson = signal<ResponsePerson | null>( null );
  columns = ['id', 'email', 'first_name', 'last_name', 'actions'];

  ngOnInit() {
    this.listPersons( 1, 3 );
  }

  listPersons( page: number, per_page: number ) {
    this.personService.listPersons( { page, per_page } )
    .pipe( takeUntilDestroyed( this.destroyRef ) )
    .subscribe( response => {
      this.responsePerson.set( response );
    } );
  }

  pageEvt( event: PageEvent ) {
    this.listPersons( event.pageIndex + 1, event.pageSize );
  }
}
