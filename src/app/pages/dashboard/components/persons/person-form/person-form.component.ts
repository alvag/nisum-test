import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomPerson, PersonForm } from '@/core/models';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Location } from '@angular/common';
import { NotificationService, PersonsService } from '@/core/services';
import { Router } from '@angular/router';

const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-M-D',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component( {
  selector: 'app-person-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    MatInput,
    MatFormField,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatLabel,
    MatButton,
    MatProgressSpinner,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './person-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },

  ]
} )
export default class PersonFormComponent implements OnInit {
  private readonly location = inject( Location );
  private readonly personService = inject( PersonsService );
  private readonly router = inject( Router );
  private readonly notificationService = inject( NotificationService );

  @Input() id!: string;

  form: FormGroup<PersonForm> = new FormGroup( new PersonForm() );

  title = signal( 'Registrar Usuario' );

  ngOnInit() {
    if ( this.id ) {
      this.title.set( 'Editar Usuario' );
      this.personService.getPersonById( +this.id ).subscribe( person => {
        this.form.patchValue( person );
      } );
    }
  }

  isLoading = signal( false );

  onSubmit() {
    const person = { ...this.form.value };
    if ( !person.id ) {
      person.id = new Date().getTime();
    }

    this.personService.setCustomPerson( person as CustomPerson );
    this.notificationService.success( 'Datos registrados correctamente' );
    this.router.navigate( ['/dashboard/persons'] );
  }

  onBack() {
    this.location.back();
  }
}
