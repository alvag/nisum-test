import { CustomPerson } from '@/core/models/person.type';
import { PersonsService } from '@/core/services';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-person-details',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    DatePipe
  ],
  templateUrl: './person-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export default class PersonDetailsComponent implements OnInit {
  destroyRef = inject( DestroyRef );
  location = inject( Location );
  router = inject( Router );

  @Input() id!: string;

  private readonly personService = inject( PersonsService );

  person = signal<CustomPerson | null>( null );

  ngOnInit() {
    this.personService.getPersonById( +this.id )
    .pipe( takeUntilDestroyed( this.destroyRef ) )
    .subscribe( person => this.person.set( person ) );
  }

  onBack() {
    this.location.back();
  }

  onEdit() {
    this.router.navigate( ['/dashboard/persons/edit', this.id] );
  }
}
